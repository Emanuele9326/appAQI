<h1 algin="center">Air Quality Index</h1>

<details open="open">
  <summary>Sommario</summary>
  <ol>
    <li>
      <a href="#informazioni-sul-progeto">Informazioni sul progetto</a>
      <ul>
       <li><a href="#link">Link</a></li>
        <li><a href="#costruito-con">Costruito con</a></li>
      </ul>
    </li>
   <li><a href="#descrizione">Descrizione</a>
     <ul>
        <li><a href="#struttura-repository">Struttura Repository</a></li>
        <li><a href="#utilizzo">Utilizzo</a></li>
      </ul>
    </li>
   <li><a href="#licenza">Licenza</a></li>
  <ol>
</details>

<!-- Informazioni sul progetto-->
## Informazioni sul progetto
 L'app puo essere testata al link riportato di seguito da un qualsiasi dispositivo come pc o mobile.
#### Link
 Per testare l'app andare al seguente link: ...

#### Costruito con:
 <b>Framework</b> utilizzati sono:
 * [Express] (https://expressjs.com)
 * [Bootstrap] (https://getbootstrap.com)

 <b>Libreria</b>:
* [Leaflet] (https://leafletjs.com/)  

 <b>Module bundler</b>
  * [Webpack] (https://webpack.js.org/)



<!--Descrizione-->
## Descrizione
 #### Struttura Repository
  Il repository è strutturato nel seguente modo:  
 <ol>
  <li><details>
    <summary>Cartella <b>src</b></summary>
    <ol>
      <li>Cartella <b>CSS</b></li>
      <li>Cartella <b>JS</b></li>
      <li>file <b>index.html</b></li>
      <li>icona:<b>favicon.ico</b></li>
    <ol>
   </details>
  </li>
    <li> Cartella <b>dist</b> </li>
    <li>file: <b>.babelrc</b></li>
    <li>file: <b>.gitignore</b></li>
    <li><b>LICENSE</b></li>
    <li><b>README.md</b></li>
    <li> Server: <b>index.js</b></li>
    <li><b>package-lock.json</b></li>
    <li><b>package.json</b></li>
    <li><b>webpack.config.js</b></li>
  </ol>

In questo progetto è stato utilizzato <b>Webpack</b> il suo scopo è quello di creare un pacchetto di assets utilizzabile direttamente
nel browser a partire da un insieme di file sorgenti strutturati su diversi file e con schemi di dipendenza complessi.

* Nella cartella <b>src</b> è presente il codice "sorgente" cioè il codice che viene scritto e modificato.
* Nella cartella <b>dist</b> è presente il codice di "distribuzione" che è l'output minimizzato e ottimizato
  del nostro processo di compilazione che verra caricato nel browser.
* Il file <b>.babelrc</b> è il file di configurazione di Babel.
  In questo progetto Babel viene utilizato principalmente per convertire il codice ECMAScript2015+
  in una versione retrocompatibile di JavaScript nei browser o negli ambienti attuali e precedenti.


 #### Utilizzo
   L'app è stata realizata per rilevare il livello di inquinamento di un determinato luogo.
   L'utente può scegliere:
     - di rilevare il livello di inquinamento di una determinata città/regione andando semplicemente ad inserire il nome nel input e premendo il pulsante AQI;
     - oppure rilevare l'inquinamento del luogo in cui si trova utilizzando il pulsante "Geolocation" .
 ## Licenza
    Distribuito con licenza MIT. Vedere "LICENZA" per ulteriori informazioni.
