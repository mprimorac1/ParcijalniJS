var polje = document.getElementById("polje"); //dohvaća input (iz html-a) s id polje (placeholder), sprema ga u varijablu polje//
var tablica = document.getElementById("table-body"); //tablica - dohvaća se tablica, sprema u varijablu
var loader = document.getElementById("loader"); // dohvaća se div iz html-a u njemu će se vrtjeti loader - oblikovanje copy-paste s w3

polje.addEventListener("input", () => {
  //na placeholder (tj. na varijablu polje) postavlja metodu - addEventListener - > var. polje je target (DOM object na koji je event listener attached)
  //postavljanje ev na input - input je event , funkcija se izvršava kada dođe do eventa, tj. do unosa znaka
  var unos = polje.value; // uzima vrijednost iz input polja, tj. iz placeholdera
  const apiURL = "https://api.tvmaze.com/search/shows?q=" + unos; //link na api, dodan mu je i unos, tj. vrijednost unijeta u placeholder

  loader.style.display = "block"; // loader je u html-u inicijalno postavljen na display none( display:none means that the tag in question will not appear on the page at all (although you can still interact with it through the dom). There will be no space allocated for it between the other tags.) unosom u polje/placeholder - pokreće se funkcija u kojoj se i loader-u(div-u) display prebacuje na block

  fetch(apiURL) // fetch metoda kao argument šalje apiURL (voditi računa da to obuhvaća i link i unos - tj. ono što je upisano)
    .then((response) => response.json()) //pretvaramo response, tj. oblikujemo ga u json dokument
    .then((data) => {
      //JSON podaci koje koristim u tablici,
      loader.style.display = "none"; //sakriva loader, tj. postavlja ga na inicijalnu vrijednost, ne zauzima prostor, sakriva ga se nakon što se podaci dohvate
      //dohvaćeni podaci su pohranjeni unutar data varijable, želimo ih ispisati unutar tablice
      const tbody = document.querySelector("#table-body"); //želi se dohvatiti (za sada još uvijek prazan t body element)
      tbody.innerHTML = ""; // čisti sadržaj t body prije novog dohvata kako bi se sprječilo dupliranje sadržaja prilikom svakog novog dohvata, paziti da bude prije forEacha
      if (data.length === 0) {
        //lenght - dužina stringa, tj. provjerava što je, na temelju našeg upisa vratio API - ako ništa nije vraćeno, tj ako je jednako 0 - ispisuje se poruka Nema rezultata
        //ako nema rezultata, prikaži poruku
        const row = document.createElement("tr"); //stvara se red
        const messageElement = document.createElement("td"); // stvara se sadržaj td
        messageElement.colSpan = 4; //spojimo sva četiri stupca u jedan kako bi se poruka prikazala preko cijele tablice
        messageElement.innerText = "Nema rezultata."; //definira se tekst koji će se upisati
        row.appendChild(messageElement); //tekst (td) se sprema u red
        tbody.appendChild(row); //red se sprema u tablicu
      } else {
        //ukoliko je ono što API vrati različito od nule
        data.forEach((element) => {
          //petlja
          //uzimamo podatke i upisujemo ih jedan po jedan u tablicu na sljedeći način
          const row = document.createElement("tr"); //kreiramo novi red u tablici

          const nameElement = document.createElement("td"); //stvaramo nameElement
          nameElement.innerText = element.show.name; //dohvaćamo  "name" iz api zahtjeva i upisujemo ga u "nameElement"

          const ratingElement = document.createElement("td"); //kreiramo novi stupac u tablici
          ratingElement.innerText = element.show.rating.average; //dohvaćamo stupac "average" iz api zahtjeva
          const summaryElement = document.createElement("td");
          summaryElement.innerHTML = element.show.summary;
          const genresElement = document.createElement("td");
          genresElement.innerHTML = element.show.genres; //

          row.appendChild(nameElement);
          row.appendChild(ratingElement);
          row.appendChild(summaryElement);
          row.appendChild(genresElement);
          //dodavanje retka u tablicu
          tbody.appendChild(row);
        });
      }
    })
    .catch((error) => console.error(error)); //za slučaj da nam je zahtjev neuspješan --> prikazat će se greška u konzoli
});
