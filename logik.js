// DOM Elements
const toolsGrid = document.getElementById('toolsGrid');
const modal = document.getElementById('toolModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const closeModalBtn = document.getElementById('closeModal');
const navBtns = document.querySelectorAll('.nav-btn');
const toolCards = document.querySelectorAll('.tool-card');

// Tool Templates
const toolTemplates = {
    wordcounter: () => `
        <div class="form-group">
            <label>Text eingeben:</label>
            <textarea id="wordCountText" placeholder="Gib deinen Text hier ein..."></textarea>
        </div>
        <div class="result-box" id="wordCountResult">
            <div><strong>Wörter:</strong> <span id="wordCount">0</span></div>
            <div><strong>Zeichen:</strong> <span id="charCount">0</span></div>
            <div><strong>Zeichen (ohne Leerzeichen):</strong> <span id="charCountNoSpace">0</span></div>
            <div><strong>Sätze:</strong> <span id="sentenceCount">0</span></div>
            <div><strong>Absätze:</strong> <span id="paragraphCount">0</span></div>
            <div><strong>Lesezeit:</strong> <span id="readTime">0</span> Min.</div>
        </div>
    `,

    caseconverter: () => `
        <div class="form-group">
            <label>Text eingeben:</label>
            <textarea id="caseText" placeholder="Gib deinen Text hier ein..."></textarea>
        </div>
        <div class="form-group">
            <button class="btn" onclick="convertCase('upper')">GROSSBUCHSTABEN</button>
            <button class="btn" onclick="convertCase('lower')">kleinbuchstaben</button>
            <button class="btn" onclick="convertCase('title')">Title Case</button>
            <button class="btn" onclick="convertCase('sentence')">Sentence case</button>
            <button class="btn" onclick="convertCase('toggle')">tOGGLE cASE</button>
        </div>
        <div class="result-box" id="caseResult" style="display:none;"></div>
    `,

    textreverser: () => `
        <div class="form-group">
            <label>Text eingeben:</label>
            <textarea id="reverseText" placeholder="Gib deinen Text hier ein..."></textarea>
        </div>
        <button class="btn" onclick="reverseText()">Text Umkehren</button>
        <button class="btn btn-secondary" onclick="reverseWords()">Wörter Umkehren</button>
        <div class="result-box" id="reverseResult" style="display:none;"></div>
    `,

    removeduplicates: () => `
        <div class="form-group">
            <label>Text eingeben (eine Zeile pro Eintrag):</label>
            <textarea id="duplicateText" placeholder="Zeile 1\nZeile 2\nZeile 1\nZeile 3"></textarea>
        </div>
        <button class="btn" onclick="removeDuplicates()">Duplikate Entfernen</button>
        <div class="result-box" id="duplicateResult" style="display:none;"></div>
    `,

    unitconverter: () => `
        <div class="form-group">
            <label>Kategorie:</label>
            <select id="unitCategory" onchange="updateUnitOptions()">
                <option value="length">Länge</option>
                <option value="weight">Gewicht</option>
                <option value="temperature">Temperatur</option>
                <option value="speed">Geschwindigkeit</option>
            </select>
        </div>
        <div class="grid-2">
            <div class="form-group">
                <label>Von:</label>
                <input type="number" id="unitFrom" placeholder="0">
                <select id="unitFromType"></select>
            </div>
            <div class="form-group">
                <label>Nach:</label>
                <input type="number" id="unitTo" readonly>
                <select id="unitToType" onchange="convertUnit()"></select>
            </div>
        </div>
    `,

    currencyconverter: () => `
        <div class="info-box">💡 Hinweis: Verwendet feste Wechselkurse zur Demonstration</div>
        <div class="grid-2">
            <div class="form-group">
                <label>Von:</label>
                <input type="number" id="currencyAmount" value="100">
                <select id="currencyFrom" onchange="convertCurrency()">
                    <option value="EUR">EUR (€)</option>
                    <option value="USD">USD ($)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="JPY">JPY (¥)</option>
                    <option value="CHF">CHF</option>
                </select>
            </div>
            <div class="form-group">
                <label>Nach:</label>
                <input type="text" id="currencyResult" readonly>
                <select id="currencyTo" onchange="convertCurrency()">
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="JPY">JPY (¥)</option>
                    <option value="CHF">CHF</option>
                </select>
            </div>
        </div>
    `,

    base64: () => `
        <div class="form-group">
            <label>Text eingeben:</label>
            <textarea id="base64Input" placeholder="Text zum Encodieren/Decodieren..."></textarea>
        </div>
        <button class="btn" onclick="encodeBase64()">Encode</button>
        <button class="btn btn-secondary" onclick="decodeBase64()">Decode</button>
        <div class="result-box" id="base64Result" style="display:none;"></div>
    `,

    colorconverter: () => `
        <div class="form-group">
            <label>Farbe auswählen:</label>
            <input type="color" id="colorPicker" value="#6366f1" onchange="updateColor()">
        </div>
        <div class="form-group">
            <label>HEX:</label>
            <input type="text" id="colorHex" placeholder="#6366f1" onchange="updateFromHex()">
        </div>
        <div class="form-group">
            <label>RGB:</label>
            <input type="text" id="colorRgb" placeholder="rgb(99, 102, 241)" readonly>
        </div>
        <div class="form-group">
            <label>HSL:</label>
            <input type="text" id="colorHsl" placeholder="hsl(239, 84%, 67%)" readonly>
        </div>
        <div class="color-preview" id="colorPreview"></div>
    `,

    calculator: () => `
        <div class="form-group">
            <input type="text" id="calcDisplay" placeholder="0" readonly style="font-size: 2rem; text-align: right;">
        </div>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
            <button class="btn btn-secondary" onclick="calcInput('7')">7</button>
            <button class="btn btn-secondary" onclick="calcInput('8')">8</button>
            <button class="btn btn-secondary" onclick="calcInput('9')">9</button>
            <button class="btn" onclick="calcInput('/')">/</button>
            <button class="btn btn-secondary" onclick="calcInput('4')">4</button>
            <button class="btn btn-secondary" onclick="calcInput('5')">5</button>
            <button class="btn btn-secondary" onclick="calcInput('6')">6</button>
            <button class="btn" onclick="calcInput('*')">*</button>
            <button class="btn btn-secondary" onclick="calcInput('1')">1</button>
            <button class="btn btn-secondary" onclick="calcInput('2')">2</button>
            <button class="btn btn-secondary" onclick="calcInput('3')">3</button>
            <button class="btn" onclick="calcInput('-')">-</button>
            <button class="btn btn-secondary" onclick="calcInput('0')">0</button>
            <button class="btn btn-secondary" onclick="calcInput('.')">.</button>
            <button class="btn btn-success" onclick="calcEquals()">=</button>
            <button class="btn" onclick="calcInput('+')">+</button>
            <button class="btn btn-danger" onclick="calcClear()" style="grid-column: span 4;">C</button>
        </div>
    `,

    percentagecalc: () => `
        <div class="form-group">
            <label>Was ist X% von Y?</label>
            <div class="grid-2">
                <input type="number" id="percent1" placeholder="X%">
                <input type="number" id="value1" placeholder="von Y">
            </div>
            <button class="btn" onclick="calcPercentOf()">Berechnen</button>
            <div class="result-box" id="percentResult1" style="display:none;"></div>
        </div>
        <div class="form-group">
            <label>X ist wieviel % von Y?</label>
            <div class="grid-2">
                <input type="number" id="value2" placeholder="X">
                <input type="number" id="total2" placeholder="von Y">
            </div>
            <button class="btn" onclick="calcWhatPercent()">Berechnen</button>
            <div class="result-box" id="percentResult2" style="display:none;"></div>
        </div>
    `,

    agecalc: () => `
        <div class="form-group">
            <label>Geburtsdatum:</label>
            <input type="date" id="birthDate">
        </div>
        <button class="btn" onclick="calculateAge()">Alter Berechnen</button>
        <div class="result-box" id="ageResult" style="display:none;"></div>
    `,

    datecalc: () => `
        <div class="form-group">
            <label>Von Datum:</label>
            <input type="date" id="dateFrom">
        </div>
        <div class="form-group">
            <label>Bis Datum:</label>
            <input type="date" id="dateTo">
        </div>
        <button class="btn" onclick="calculateDateDiff()">Differenz Berechnen</button>
        <div class="result-box" id="dateResult" style="display:none;"></div>
    `,

    passwordgen: () => `
        <div class="form-group">
            <label>Passwort Länge: <span id="pwdLengthDisplay">16</span></label>
            <input type="range" id="pwdLength" min="8" max="64" value="16" oninput="updatePwdLength()">
        </div>
        <div class="checkbox-group">
            <label class="checkbox-label">
                <input type="checkbox" id="pwdUppercase" checked> Großbuchstaben
            </label>
            <label class="checkbox-label">
                <input type="checkbox" id="pwdLowercase" checked> Kleinbuchstaben
            </label>
            <label class="checkbox-label">
                <input type="checkbox" id="pwdNumbers" checked> Zahlen
            </label>
            <label class="checkbox-label">
                <input type="checkbox" id="pwdSymbols" checked> Symbole
            </label>
        </div>
        <button class="btn" onclick="generatePassword()">Passwort Generieren</button>
        <button class="btn btn-success" onclick="copyPassword()">Kopieren</button>
        <div class="result-box" id="passwordResult" style="display:none;"></div>
    `,

    qrcode: () => `
        <div class="form-group">
            <label>Text oder URL:</label>
            <textarea id="qrText" placeholder="https://example.com"></textarea>
        </div>
        <div class="form-group">
            <label>Größe:</label>
            <select id="qrSize">
                <option value="128">Klein (128x128)</option>
                <option value="256" selected>Mittel (256x256)</option>
                <option value="512">Groß (512x512)</option>
            </select>
        </div>
        <button class="btn" onclick="generateQR()">QR Code Erstellen</button>
        <button class="btn btn-secondary" onclick="clearQR()">Löschen</button>
        <div class="qr-display" id="qrDisplay" style="display:none;">
            <div id="qrcode" style="display: inline-block; padding: 20px; background: white; border-radius: 10px;"></div>
        </div>
    `,

    loremipsum: () => `
        <div class="form-group">
            <label>Anzahl Absätze:</label>
            <input type="number" id="loremParagraphs" value="3" min="1" max="10">
        </div>
        <button class="btn" onclick="generateLorem()">Generieren</button>
        <button class="btn btn-success" onclick="copyLorem()">Kopieren</button>
        <div class="result-box" id="loremResult" style="display:none;"></div>
    `,

    uuidgen: () => `
        <div class="form-group">
            <label>Anzahl UUIDs:</label>
            <input type="number" id="uuidCount" value="1" min="1" max="10">
        </div>
        <button class="btn" onclick="generateUUID()">UUID Generieren</button>
        <button class="btn btn-success" onclick="copyUUID()">Kopieren</button>
        <div class="result-box" id="uuidResult" style="display:none;"></div>
    `,

    timer: () => `
        <div class="form-group">
            <label>Minuten:</label>
            <input type="number" id="timerMinutes" value="5" min="0">
        </div>
        <div class="form-group">
            <label>Sekunden:</label>
            <input type="number" id="timerSeconds" value="0" min="0" max="59">
        </div>
        <div class="timer-display" id="timerDisplay">05:00</div>
        <button class="btn btn-success" id="timerStart" onclick="startTimer()">Start</button>
        <button class="btn btn-danger" id="timerStop" onclick="stopTimer()" style="display:none;">Stop</button>
        <button class="btn btn-secondary" onclick="resetTimer()">Reset</button>
    `,

    stopwatch: () => `
        <div class="timer-display" id="stopwatchDisplay">00:00:00</div>
        <button class="btn btn-success" id="stopwatchStart" onclick="startStopwatch()">Start</button>
        <button class="btn btn-danger" id="stopwatchStop" onclick="stopStopwatch()" style="display:none;">Stop</button>
        <button class="btn btn-secondary" onclick="resetStopwatch()">Reset</button>
        <div class="result-box" id="lapTimes" style="display:none; margin-top: 20px;">
            <h3>Rundenzeiten:</h3>
            <div id="lapList"></div>
        </div>
        <button class="btn" id="lapBtn" onclick="addLap()" style="display:none; margin-top: 10px;">Runde</button>
    `,

    notepad: () => `
        <div class="form-group">
            <textarea id="notepadText" placeholder="Deine Notizen..." style="min-height: 300px;"></textarea>
        </div>
        <button class="btn btn-success" onclick="saveNote()">Speichern (LocalStorage)</button>
        <button class="btn btn-secondary" onclick="clearNote()">Löschen</button>
        <button class="btn" onclick="downloadNote()">Als .txt herunterladen</button>
        <div class="info-box" style="margin-top: 15px;">💾 Notizen werden automatisch im Browser gespeichert</div>
    `,

    jsonformatter: () => `
        <div class="form-group">
            <label>JSON eingeben:</label>
            <textarea id="jsonInput" placeholder='{"name": "John", "age": 30}'></textarea>
        </div>
        <button class="btn" onclick="formatJSON()">Formatieren</button>
        <button class="btn btn-secondary" onclick="minifyJSON()">Minify</button>
        <button class="btn" onclick="validateJSON()">Validieren</button>
        <div class="result-box" id="jsonResult" style="display:none;"></div>
    `,

    markdownpreview: () => `
        <div class="grid-2" style="gap: 20px;">
            <div class="form-group">
                <label>Markdown:</label>
                <textarea id="markdownInput" oninput="updateMarkdown()" placeholder="# Überschrift\n**Fett** und *kursiv*"></textarea>
            </div>
            <div class="form-group">
                <label>Vorschau:</label>
                <div class="result-box" id="markdownPreview" style="min-height: 150px;"></div>
            </div>
        </div>
    `,

    ipinfo: () => `
        <button class="btn" onclick="getIPInfo()">Meine IP Anzeigen</button>
        <div class="result-box" id="ipResult" style="display:none;"></div>
    `,

    // NEW TOOLS - Wave 2
    
    textdiff: () => `
        <div class="grid-2">
            <div class="form-group">
                <label>Text 1:</label>
                <textarea id="diffText1" placeholder="Erster Text..."></textarea>
            </div>
            <div class="form-group">
                <label>Text 2:</label>
                <textarea id="diffText2" placeholder="Zweiter Text..."></textarea>
            </div>
        </div>
        <button class="btn" onclick="compareTexts()">Vergleichen</button>
        <div class="result-box" id="diffResult" style="display:none;"></div>
    `,

    slugify: () => `
        <div class="form-group">
            <label>Text eingeben:</label>
            <input type="text" id="slugInput" placeholder="Mein Super Titel 123!" oninput="generateSlug()">
        </div>
        <div class="result-box success" id="slugResult" style="display:none;"></div>
        <div class="info-box">
            <strong>Beispiel:</strong> "Mein Super Titel!" → "mein-super-titel"
        </div>
    `,

    textencrypt: () => `
        <div class="form-group">
            <label>Text eingeben:</label>
            <textarea id="encryptText" placeholder="Geheimer Text..."></textarea>
        </div>
        <div class="form-group">
            <label>Verschiebung (1-25):</label>
            <input type="number" id="caesarShift" value="3" min="1" max="25">
        </div>
        <button class="btn" onclick="caesarEncrypt()">Verschlüsseln</button>
        <button class="btn btn-secondary" onclick="caesarDecrypt()">Entschlüsseln</button>
        <div class="result-box" id="encryptResult" style="display:none;"></div>
    `,

    morse: () => `
        <div class="form-group">
            <label>Text eingeben:</label>
            <textarea id="morseInput" placeholder="Hello World oder ... --- ..."></textarea>
        </div>
        <button class="btn" onclick="textToMorse()">Text → Morse</button>
        <button class="btn btn-secondary" onclick="morseToText()">Morse → Text</button>
        <div class="result-box" id="morseResult" style="display:none;"></div>
        <div class="info-box">
            <strong>Beispiel:</strong> "SOS" → "... --- ..."
        </div>
    `,

    imageresizer: () => `
        <div class="form-group">
            <label>Bild hochladen:</label>
            <input type="file" id="imageInput" accept="image/*" onchange="loadImage()">
        </div>
        <div class="grid-2">
            <div class="form-group">
                <label>Breite (px):</label>
                <input type="number" id="imageWidth" placeholder="800">
            </div>
            <div class="form-group">
                <label>Höhe (px):</label>
                <input type="number" id="imageHeight" placeholder="600">
            </div>
        </div>
        <label class="checkbox-label">
            <input type="checkbox" id="keepAspect" checked> Seitenverhältnis beibehalten
        </label>
        <button class="btn" onclick="resizeImage()">Größe ändern</button>
        <canvas id="imageCanvas" style="display:none; max-width:100%; margin-top:20px; border: 2px solid var(--border); border-radius: 10px;"></canvas>
        <div id="downloadBtn" style="display:none; margin-top:10px;">
            <button class="btn btn-success" onclick="downloadResizedImage()">Herunterladen</button>
        </div>
    `,

    timestamp: () => `
        <div class="form-group">
            <label>Unix Timestamp:</label>
            <input type="number" id="timestampInput" placeholder="1700000000">
            <button class="btn" onclick="timestampToDate()">Zu Datum</button>
        </div>
        <div class="form-group">
            <label>Datum & Zeit:</label>
            <input type="datetime-local" id="dateInput">
            <button class="btn" onclick="dateToTimestamp()">Zu Timestamp</button>
        </div>
        <button class="btn btn-secondary" onclick="currentTimestamp()">Aktueller Timestamp</button>
        <div class="result-box" id="timestampResult" style="display:none;"></div>
    `,

    numberbase: () => `
        <div class="form-group">
            <label>Eingabe:</label>
            <input type="text" id="numberInput" placeholder="42">
            <select id="inputBase">
                <option value="10">Dezimal</option>
                <option value="2">Binär</option>
                <option value="8">Oktal</option>
                <option value="16">Hexadezimal</option>
            </select>
        </div>
        <button class="btn" onclick="convertNumberBase()">Konvertieren</button>
        <div class="result-box" id="baseResult" style="display:none;"></div>
    `,

    videodownload: () => `
        <div class="form-group">
            <label>Video URL eingeben:</label>
            <input type="text" id="videoUrl" placeholder="https://www.youtube.com/watch?v=...">
        </div>
        <button class="btn" onclick="analyzeVideoUrl()">Analysieren</button>
        <div class="result-box" id="videoResult" style="display:none;"></div>
        <div class="info-box">
            💡 Extrahiert Video-ID und Parameter aus der URL
        </div>
    `,

    bmicalc: () => `
        <div class="grid-2">
            <div class="form-group">
                <label>Größe (cm):</label>
                <input type="number" id="bmiHeight" placeholder="175">
            </div>
            <div class="form-group">
                <label>Gewicht (kg):</label>
                <input type="number" id="bmiWeight" placeholder="70">
            </div>
        </div>
        <button class="btn" onclick="calculateBMI()">BMI Berechnen</button>
        <div class="result-box" id="bmiResult" style="display:none;"></div>
    `,

    loancalc: () => `
        <div class="form-group">
            <label>Kreditbetrag (€):</label>
            <input type="number" id="loanAmount" placeholder="10000">
        </div>
        <div class="grid-2">
            <div class="form-group">
                <label>Zinssatz (%):</label>
                <input type="number" id="loanRate" placeholder="5" step="0.1">
            </div>
            <div class="form-group">
                <label>Laufzeit (Monate):</label>
                <input type="number" id="loanMonths" placeholder="36">
            </div>
        </div>
        <button class="btn" onclick="calculateLoan()">Berechnen</button>
        <div class="result-box" id="loanResult" style="display:none;"></div>
    `,

    tipcalc: () => `
        <div class="form-group">
            <label>Rechnungsbetrag (€):</label>
            <input type="number" id="billAmount" placeholder="50">
        </div>
        <div class="form-group">
            <label>Trinkgeld (%):</label>
            <input type="range" id="tipPercent" min="0" max="30" value="10" oninput="updateTipPercent()">
            <span id="tipPercentDisplay">10%</span>
        </div>
        <div class="form-group">
            <label>Anzahl Personen:</label>
            <input type="number" id="tipPersons" value="1" min="1">
        </div>
        <button class="btn" onclick="calculateTip()">Berechnen</button>
        <div class="result-box" id="tipResult" style="display:none;"></div>
    `,

    gradecalc: () => `
        <div class="form-group">
            <label>Noten eingeben (eine pro Zeile):</label>
            <textarea id="gradesInput" placeholder="1.5\n2.0\n1.7\n2.3"></textarea>
        </div>
        <button class="btn" onclick="calculateGrades()">Durchschnitt Berechnen</button>
        <div class="result-box" id="gradesResult" style="display:none;"></div>
    `,

    randomcolor: () => `
        <button class="btn" onclick="generateRandomColors()">Neue Palette Generieren</button>
        <div id="colorPalette" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap:15px; margin-top:20px;"></div>
    `,

    fakename: () => `
        <div class="form-group">
            <label>Geschlecht:</label>
            <select id="nameGender">
                <option value="male">Männlich</option>
                <option value="female">Weiblich</option>
                <option value="random">Zufällig</option>
            </select>
        </div>
        <button class="btn" onclick="generateFakeName()">Namen Generieren</button>
        <div class="result-box" id="fakeNameResult" style="display:none;"></div>
    `,

    randomnumber: () => `
        <div class="grid-2">
            <div class="form-group">
                <label>Minimum:</label>
                <input type="number" id="randomMin" value="1">
            </div>
            <div class="form-group">
                <label>Maximum:</label>
                <input type="number" id="randomMax" value="100">
            </div>
        </div>
        <div class="form-group">
            <label>Anzahl Zahlen:</label>
            <input type="number" id="randomCount" value="1" min="1" max="100">
        </div>
        <button class="btn" onclick="generateRandomNumbers()">Generieren</button>
        <div class="result-box success" id="randomResult" style="display:none;"></div>
    `,

    emailsig: () => `
        <div class="form-group">
            <label>Name:</label>
            <input type="text" id="sigName" placeholder="Max Mustermann">
        </div>
        <div class="form-group">
            <label>Position:</label>
            <input type="text" id="sigPosition" placeholder="Software Entwickler">
        </div>
        <div class="form-group">
            <label>Email:</label>
            <input type="email" id="sigEmail" placeholder="max@example.com">
        </div>
        <div class="form-group">
            <label>Telefon:</label>
            <input type="text" id="sigPhone" placeholder="+49 123 456789">
        </div>
        <button class="btn" onclick="generateEmailSignature()">Signatur Erstellen</button>
        <div class="result-box" id="sigResult" style="display:none;"></div>
    `,

    urlshortener: () => `
        <div class="form-group">
            <label>URL eingeben:</label>
            <input type="text" id="urlInput" placeholder="https://example.com/page?param=value&other=123">
        </div>
        <button class="btn" onclick="parseURL()">URL Analysieren</button>
        <div class="result-box" id="urlResult" style="display:none;"></div>
    `,

    hasher: () => `
        <div class="form-group">
            <label>Text eingeben:</label>
            <textarea id="hashInput" placeholder="Text zum Hashen..."></textarea>
        </div>
        <button class="btn" onclick="generateHash('md5')">MD5</button>
        <button class="btn" onclick="generateHash('sha1')">SHA-1</button>
        <button class="btn" onclick="generateHash('sha256')">SHA-256</button>
        <div class="result-box" id="hashResult" style="display:none;"></div>
    `,

    cssminifier: () => `
        <div class="form-group">
            <label>CSS Code:</label>
            <textarea id="cssInput" placeholder=".class { color: red; }"></textarea>
        </div>
        <button class="btn" onclick="minifyCSS()">Minify</button>
        <button class="btn btn-secondary" onclick="beautifyCSS()">Beautify</button>
        <div class="result-box" id="cssResult" style="display:none;"></div>
    `,

    regextester: () => `
        <div class="form-group">
            <label>Regular Expression:</label>
            <input type="text" id="regexPattern" placeholder="[A-Za-z0-9]+">
        </div>
        <div class="form-group">
            <label>Test String:</label>
            <textarea id="regexTest" placeholder="Test123"></textarea>
        </div>
        <label class="checkbox-label">
            <input type="checkbox" id="regexGlobal" checked> Global (g)
        </label>
        <label class="checkbox-label">
            <input type="checkbox" id="regexCase"> Case Insensitive (i)
        </label>
        <button class="btn" onclick="testRegex()">Testen</button>
        <div class="result-box" id="regexResult" style="display:none;"></div>
    `,

    csvviewer: () => `
        <div class="form-group">
            <label>CSV Data:</label>
            <textarea id="csvInput" placeholder="Name,Age,City\nJohn,30,Berlin\nJane,25,München"></textarea>
        </div>
        <button class="btn" onclick="parseCSV()">CSV Anzeigen</button>
        <div class="result-box" id="csvResult" style="display:none; overflow-x: auto;"></div>
    `,

    speedtest: () => `
        <div style="text-align: center;">
            <div id="speedInstructions" class="info-box">
                <h3>Reaktionstest</h3>
                <p>Klicke auf START und warte bis die Box grün wird, dann klicke so schnell wie möglich!</p>
            </div>
            <div id="speedBox" style="width: 100%; height: 300px; background: var(--surface-light); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 2rem; cursor: pointer; margin: 20px 0;" onclick="speedClick()">
                Klick hier!
            </div>
            <button class="btn btn-success" onclick="startSpeedTest()">START</button>
            <button class="btn btn-secondary" onclick="resetSpeedTest()">Reset</button>
            <div class="result-box" id="speedResult" style="display:none;"></div>
        </div>
    `
};

// Event Listeners
closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Navigation Filter
navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Clear search when clicking category
        document.getElementById('searchInput').value = '';
        
        toolCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Search Tools
function searchTools() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    // Reset category filter when searching
    if (searchTerm) {
        navBtns.forEach(btn => btn.classList.remove('active'));
    }
    
    toolCards.forEach(card => {
        const title = card.querySelector('.tool-title').textContent.toLowerCase();
        const description = card.querySelector('.tool-description').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    // If search is empty, show all
    if (!searchTerm) {
        navBtns[0].classList.add('active'); // Activate "Alle"
        toolCards.forEach(card => card.style.display = 'block');
    }
}

// Tool Cards Click
toolCards.forEach(card => {
    card.addEventListener('click', () => {
        const toolName = card.dataset.tool;
        const toolTitle = card.querySelector('.tool-title').textContent;
        openTool(toolName, toolTitle);
    });
});

// Open Tool Modal
function openTool(toolName, title) {
    modalTitle.textContent = title;
    modalBody.innerHTML = toolTemplates[toolName]();
    modal.classList.add('active');
    
    // Initialize tool-specific features
    initializeTool(toolName);
}

// Close Modal
function closeModal() {
    modal.classList.remove('active');
}

// Initialize Tool-specific Features
function initializeTool(toolName) {
    switch(toolName) {
        case 'wordcounter':
            document.getElementById('wordCountText').addEventListener('input', updateWordCount);
            break;
        case 'unitconverter':
            updateUnitOptions();
            document.getElementById('unitFrom').addEventListener('input', convertUnit);
            break;
        case 'currencyconverter':
            convertCurrency();
            document.getElementById('currencyAmount').addEventListener('input', convertCurrency);
            break;
        case 'colorconverter':
            updateColor();
            break;
        case 'notepad':
            loadNote();
            break;
    }
}

// Tool Functions

// Word Counter
function updateWordCount() {
    const text = document.getElementById('wordCountText').value;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, '').length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
    const paragraphs = text.split(/\n+/).filter(p => p.trim()).length;
    const readTime = Math.ceil(words / 200);
    
    document.getElementById('wordCount').textContent = words;
    document.getElementById('charCount').textContent = chars;
    document.getElementById('charCountNoSpace').textContent = charsNoSpace;
    document.getElementById('sentenceCount').textContent = sentences;
    document.getElementById('paragraphCount').textContent = paragraphs;
    document.getElementById('readTime').textContent = readTime;
}

// Case Converter
function convertCase(type) {
    const input = document.getElementById('caseText').value;
    let result = '';
    
    switch(type) {
        case 'upper':
            result = input.toUpperCase();
            break;
        case 'lower':
            result = input.toLowerCase();
            break;
        case 'title':
            result = input.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
            break;
        case 'sentence':
            result = input.toLowerCase().replace(/(^\w|\.\s+\w)/gm, c => c.toUpperCase());
            break;
        case 'toggle':
            result = input.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('');
            break;
    }
    
    const resultBox = document.getElementById('caseResult');
    resultBox.textContent = result;
    resultBox.style.display = 'block';
}

// Text Reverser
function reverseText() {
    const input = document.getElementById('reverseText').value;
    const result = input.split('').reverse().join('');
    showResult('reverseResult', result);
}

function reverseWords() {
    const input = document.getElementById('reverseText').value;
    const result = input.split(' ').reverse().join(' ');
    showResult('reverseResult', result);
}

// Remove Duplicates
function removeDuplicates() {
    const input = document.getElementById('duplicateText').value;
    const lines = input.split('\n');
    const unique = [...new Set(lines)];
    showResult('duplicateResult', unique.join('\n'));
}

// Unit Converter
const units = {
    length: { meter: 1, kilometer: 0.001, centimeter: 100, millimeter: 1000, mile: 0.000621371, yard: 1.09361, foot: 3.28084, inch: 39.3701 },
    weight: { kilogram: 1, gram: 1000, milligram: 1000000, ton: 0.001, pound: 2.20462, ounce: 35.274 },
    temperature: {},
    speed: { 'km/h': 1, 'm/s': 0.277778, 'mph': 0.621371, 'knots': 0.539957 }
};

function updateUnitOptions() {
    const category = document.getElementById('unitCategory').value;
    const fromSelect = document.getElementById('unitFromType');
    const toSelect = document.getElementById('unitToType');
    
    fromSelect.innerHTML = '';
    toSelect.innerHTML = '';
    
    Object.keys(units[category]).forEach(unit => {
        fromSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
        toSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
    });
    
    convertUnit();
}

function convertUnit() {
    const category = document.getElementById('unitCategory').value;
    const value = parseFloat(document.getElementById('unitFrom').value) || 0;
    const fromUnit = document.getElementById('unitFromType').value;
    const toUnit = document.getElementById('unitToType').value;
    
    if (category === 'temperature') {
        document.getElementById('unitTo').value = convertTemperature(value, fromUnit, toUnit);
        return;
    }
    
    const baseValue = value / units[category][fromUnit];
    const result = baseValue * units[category][toUnit];
    document.getElementById('unitTo').value = result.toFixed(4);
}

// Currency Converter
const exchangeRates = {
    EUR: 1,
    USD: 1.09,
    GBP: 0.86,
    JPY: 163.5,
    CHF: 0.94
};

function convertCurrency() {
    const amount = parseFloat(document.getElementById('currencyAmount').value) || 0;
    const from = document.getElementById('currencyFrom').value;
    const to = document.getElementById('currencyTo').value;
    
    const euroAmount = amount / exchangeRates[from];
    const result = euroAmount * exchangeRates[to];
    
    document.getElementById('currencyResult').value = result.toFixed(2);
}

// Base64
function encodeBase64() {
    const input = document.getElementById('base64Input').value;
    try {
        const result = btoa(unescape(encodeURIComponent(input)));
        showResult('base64Result', result, true);
    } catch (e) {
        showResult('base64Result', 'Fehler beim Encodieren!', false);
    }
}

function decodeBase64() {
    const input = document.getElementById('base64Input').value;
    try {
        const result = decodeURIComponent(escape(atob(input)));
        showResult('base64Result', result, true);
    } catch (e) {
        showResult('base64Result', 'Ungültiger Base64 String!', false);
    }
}

// Color Converter
function updateColor() {
    const color = document.getElementById('colorPicker').value;
    document.getElementById('colorHex').value = color;
    
    const rgb = hexToRgb(color);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    
    document.getElementById('colorRgb').value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    document.getElementById('colorHsl').value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    document.getElementById('colorPreview').style.background = color;
}

function updateFromHex() {
    const hex = document.getElementById('colorHex').value;
    document.getElementById('colorPicker').value = hex;
    updateColor();
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

// Calculator
let calcExpression = '';

function calcInput(value) {
    calcExpression += value;
    document.getElementById('calcDisplay').value = calcExpression;
}

function calcEquals() {
    try {
        calcExpression = eval(calcExpression).toString();
        document.getElementById('calcDisplay').value = calcExpression;
    } catch (e) {
        document.getElementById('calcDisplay').value = 'Error';
        calcExpression = '';
    }
}

function calcClear() {
    calcExpression = '';
    document.getElementById('calcDisplay').value = '0';
}

// Percentage Calculator
function calcPercentOf() {
    const percent = parseFloat(document.getElementById('percent1').value);
    const value = parseFloat(document.getElementById('value1').value);
    const result = (percent / 100) * value;
    showResult('percentResult1', `${percent}% von ${value} = ${result.toFixed(2)}`, true);
}

function calcWhatPercent() {
    const value = parseFloat(document.getElementById('value2').value);
    const total = parseFloat(document.getElementById('total2').value);
    const result = (value / total) * 100;
    showResult('percentResult2', `${value} ist ${result.toFixed(2)}% von ${total}`, true);
}

// Age Calculator
function calculateAge() {
    const birthDate = new Date(document.getElementById('birthDate').value);
    const today = new Date();
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();
    
    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }
    
    const totalDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
    const hours = totalDays * 24;
    
    const result = `
        <strong>Alter:</strong> ${years} Jahre, ${months} Monate, ${days} Tage<br>
        <strong>Total:</strong> ${totalDays.toLocaleString()} Tage (${hours.toLocaleString()} Stunden)
    `;
    
    showResult('ageResult', result, true);
}

// Date Calculator
function calculateDateDiff() {
    const date1 = new Date(document.getElementById('dateFrom').value);
    const date2 = new Date(document.getElementById('dateTo').value);
    
    const diff = Math.abs(date2 - date1);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    const result = `
        <strong>Differenz:</strong><br>
        ${days} Tage<br>
        ${hours.toLocaleString()} Stunden<br>
        ${minutes.toLocaleString()} Minuten
    `;
    
    showResult('dateResult', result, true);
}

// Password Generator
function updatePwdLength() {
    document.getElementById('pwdLengthDisplay').textContent = document.getElementById('pwdLength').value;
}

function generatePassword() {
    const length = parseInt(document.getElementById('pwdLength').value);
    const useUpper = document.getElementById('pwdUppercase').checked;
    const useLower = document.getElementById('pwdLowercase').checked;
    const useNumbers = document.getElementById('pwdNumbers').checked;
    const useSymbols = document.getElementById('pwdSymbols').checked;
    
    let chars = '';
    if (useUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) chars += '0123456789';
    if (useSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (!chars) {
        showResult('passwordResult', 'Bitte wähle mindestens eine Option!', false);
        return;
    }
    
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    showResult('passwordResult', password, true);
}

function copyPassword() {
    const password = document.getElementById('passwordResult').textContent;
    copyToClipboard(password);
}

// QR Code Generator
let qrcodeObj = null;

function generateQR() {
    const text = document.getElementById('qrText').value;
    if (!text) {
        alert('Bitte Text eingeben!');
        return;
    }
    
    const size = parseInt(document.getElementById('qrSize').value);
    const qrDiv = document.getElementById('qrcode');
    
    // Clear previous QR code
    qrDiv.innerHTML = '';
    
    // Generate new QR code
    qrcodeObj = new QRCode(qrDiv, {
        text: text,
        width: size,
        height: size,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
    
    document.getElementById('qrDisplay').style.display = 'block';
}

function clearQR() {
    document.getElementById('qrcode').innerHTML = '';
    document.getElementById('qrDisplay').style.display = 'none';
    document.getElementById('qrText').value = '';
}

// Lorem Ipsum Generator
const loremText = "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum";

function generateLorem() {
    const paragraphs = parseInt(document.getElementById('loremParagraphs').value);
    const words = loremText.split(' ');
    let result = '';
    
    for (let i = 0; i < paragraphs; i++) {
        let paragraph = '';
        const sentenceCount = Math.floor(Math.random() * 3) + 3;
        
        for (let j = 0; j < sentenceCount; j++) {
            const wordCount = Math.floor(Math.random() * 10) + 5;
            let sentence = '';
            
            for (let k = 0; k < wordCount; k++) {
                sentence += words[Math.floor(Math.random() * words.length)] + ' ';
            }
            
            paragraph += sentence.trim() + '. ';
        }
        
        result += paragraph.trim() + '\n\n';
    }
    
    showResult('loremResult', result.trim(), true);
}

function copyLorem() {
    const text = document.getElementById('loremResult').textContent;
    copyToClipboard(text);
}

// UUID Generator
function generateUUID() {
    const count = parseInt(document.getElementById('uuidCount').value);
    let result = '';
    
    for (let i = 0; i < count; i++) {
        result += crypto.randomUUID() + '\n';
    }
    
    showResult('uuidResult', result.trim(), true);
}

function copyUUID() {
    const text = document.getElementById('uuidResult').textContent;
    copyToClipboard(text);
}

// Timer
let timerInterval = null;
let timerSeconds = 0;

function startTimer() {
    const minutes = parseInt(document.getElementById('timerMinutes').value) || 0;
    const seconds = parseInt(document.getElementById('timerSeconds').value) || 0;
    timerSeconds = minutes * 60 + seconds;
    
    document.getElementById('timerStart').style.display = 'none';
    document.getElementById('timerStop').style.display = 'inline-block';
    
    timerInterval = setInterval(() => {
        if (timerSeconds <= 0) {
            stopTimer();
            alert('Timer abgelaufen!');
            return;
        }
        
        timerSeconds--;
        updateTimerDisplay();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    document.getElementById('timerStart').style.display = 'inline-block';
    document.getElementById('timerStop').style.display = 'none';
}

function resetTimer() {
    stopTimer();
    timerSeconds = 0;
    document.getElementById('timerDisplay').textContent = '00:00';
}

function updateTimerDisplay() {
    const mins = Math.floor(timerSeconds / 60);
    const secs = timerSeconds % 60;
    document.getElementById('timerDisplay').textContent = 
        `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Stopwatch
let stopwatchInterval = null;
let stopwatchTime = 0;

function startStopwatch() {
    document.getElementById('stopwatchStart').style.display = 'none';
    document.getElementById('stopwatchStop').style.display = 'inline-block';
    document.getElementById('lapBtn').style.display = 'inline-block';
    
    stopwatchInterval = setInterval(() => {
        stopwatchTime++;
        updateStopwatchDisplay();
    }, 10);
}

function stopStopwatch() {
    clearInterval(stopwatchInterval);
    document.getElementById('stopwatchStart').style.display = 'inline-block';
    document.getElementById('stopwatchStop').style.display = 'none';
    document.getElementById('lapBtn').style.display = 'none';
}

function resetStopwatch() {
    stopStopwatch();
    stopwatchTime = 0;
    document.getElementById('stopwatchDisplay').textContent = '00:00:00';
    document.getElementById('lapList').innerHTML = '';
    document.getElementById('lapTimes').style.display = 'none';
}

function updateStopwatchDisplay() {
    const hours = Math.floor(stopwatchTime / 360000);
    const minutes = Math.floor((stopwatchTime % 360000) / 6000);
    const seconds = Math.floor((stopwatchTime % 6000) / 100);
    const centiseconds = stopwatchTime % 100;
    
    document.getElementById('stopwatchDisplay').textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`;
}

function addLap() {
    const lapTime = document.getElementById('stopwatchDisplay').textContent;
    const lapList = document.getElementById('lapList');
    const lapNumber = lapList.children.length + 1;
    
    lapList.innerHTML = `<div>Runde ${lapNumber}: ${lapTime}</div>` + lapList.innerHTML;
    document.getElementById('lapTimes').style.display = 'block';
}

// Notepad
function saveNote() {
    const text = document.getElementById('notepadText').value;
    localStorage.setItem('notepad', text);
    alert('Notiz gespeichert!');
}

function loadNote() {
    const saved = localStorage.getItem('notepad');
    if (saved) {
        document.getElementById('notepadText').value = saved;
    }
}

function clearNote() {
    if (confirm('Notiz wirklich löschen?')) {
        document.getElementById('notepadText').value = '';
        localStorage.removeItem('notepad');
    }
}

function downloadNote() {
    const text = document.getElementById('notepadText').value;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'notiz.txt';
    a.click();
}

// JSON Formatter
function formatJSON() {
    const input = document.getElementById('jsonInput').value;
    try {
        const obj = JSON.parse(input);
        const formatted = JSON.stringify(obj, null, 2);
        showResult('jsonResult', formatted, true);
    } catch (e) {
        showResult('jsonResult', 'Ungültiges JSON: ' + e.message, false);
    }
}

function minifyJSON() {
    const input = document.getElementById('jsonInput').value;
    try {
        const obj = JSON.parse(input);
        const minified = JSON.stringify(obj);
        showResult('jsonResult', minified, true);
    } catch (e) {
        showResult('jsonResult', 'Ungültiges JSON: ' + e.message, false);
    }
}

function validateJSON() {
    const input = document.getElementById('jsonInput').value;
    try {
        JSON.parse(input);
        showResult('jsonResult', '✓ Gültiges JSON!', true);
    } catch (e) {
        showResult('jsonResult', '✗ Ungültiges JSON: ' + e.message, false);
    }
}

// Markdown Preview
function updateMarkdown() {
    const input = document.getElementById('markdownInput').value;
    const preview = document.getElementById('markdownPreview');
    
    // Basic markdown conversion
    let html = input
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .replace(/\n/gim, '<br>');
    
    preview.innerHTML = html;
}

// IP Info
async function getIPInfo() {
    const resultBox = document.getElementById('ipResult');
    resultBox.style.display = 'block';
    resultBox.innerHTML = 'Lade IP Informationen...';
    
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        
        resultBox.innerHTML = `
            <strong>Deine IP Adresse:</strong><br>
            ${data.ip}<br><br>
            <small>Diese IP ist öffentlich sichtbar</small>
        `;
        resultBox.classList.add('success');
    } catch (e) {
        resultBox.innerHTML = 'Fehler beim Laden der IP Informationen';
        resultBox.classList.add('error');
    }
}

// Helper Functions
function showResult(elementId, text, success = true) {
    const element = document.getElementById(elementId);
    element.innerHTML = text;
    element.style.display = 'block';
    element.classList.remove('success', 'error');
    element.classList.add(success ? 'success' : 'error');
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('In Zwischenablage kopiert!');
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Ultimate Multitool loaded!');
});

// NEW TOOL IMPLEMENTATIONS - Wave 2

// Text Diff
function compareTexts() {
    const text1 = document.getElementById('diffText1').value;
    const text2 = document.getElementById('diffText2').value;
    
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    
    let result = '<strong>Unterschiede gefunden:</strong><br><br>';
    let differences = 0;
    
    const maxLines = Math.max(lines1.length, lines2.length);
    
    for (let i = 0; i < maxLines; i++) {
        if (lines1[i] !== lines2[i]) {
            differences++;
            result += `<strong>Zeile ${i + 1}:</strong><br>`;
            result += `<span style="color: #ef4444;">- ${lines1[i] || '(leer)'}</span><br>`;
            result += `<span style="color: #10b981;">+ ${lines2[i] || '(leer)'}</span><br><br>`;
        }
    }
    
    if (differences === 0) {
        result = '<strong style="color: #10b981;">✓ Texte sind identisch!</strong>';
    } else {
        result = `<strong>${differences} Unterschied(e) gefunden:</strong><br><br>` + result;
    }
    
    showResult('diffResult', result, true);
}

// Slugify
function generateSlug() {
    const input = document.getElementById('slugInput').value;
    const slug = input
        .toLowerCase()
        .trim()
        .replace(/[äöü]/g, match => ({ 'ä': 'ae', 'ö': 'oe', 'ü': 'ue' }[match]))
        .replace(/ß/g, 'ss')
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    
    const resultBox = document.getElementById('slugResult');
    resultBox.innerHTML = `<strong>URL Slug:</strong><br>${slug}`;
    resultBox.style.display = 'block';
}

// Caesar Cipher
function caesarEncrypt() {
    const text = document.getElementById('encryptText').value;
    const shift = parseInt(document.getElementById('caesarShift').value);
    const result = caesarCipher(text, shift);
    showResult('encryptResult', result, true);
}

function caesarDecrypt() {
    const text = document.getElementById('encryptText').value;
    const shift = parseInt(document.getElementById('caesarShift').value);
    const result = caesarCipher(text, -shift);
    showResult('encryptResult', result, true);
}

function caesarCipher(text, shift) {
    return text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt(0);
            const base = code >= 65 && code <= 90 ? 65 : 97;
            return String.fromCharCode(((code - base + shift + 26) % 26) + base);
        }
        return char;
    }).join('');
}

// Morse Code
const morseCode = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', ' ': '/'
};

function textToMorse() {
    const text = document.getElementById('morseInput').value.toUpperCase();
    const morse = text.split('').map(char => morseCode[char] || char).join(' ');
    showResult('morseResult', morse, true);
}

function morseToText() {
    const morse = document.getElementById('morseInput').value;
    const reverseMorse = Object.fromEntries(Object.entries(morseCode).map(([k, v]) => [v, k]));
    const text = morse.split(' ').map(code => reverseMorse[code] || code).join('');
    showResult('morseResult', text, true);
}

// Image Resizer
let originalImage = null;

function loadImage() {
    const file = document.getElementById('imageInput').files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            originalImage = img;
            document.getElementById('imageWidth').value = img.width;
            document.getElementById('imageHeight').value = img.height;
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function resizeImage() {
    if (!originalImage) {
        alert('Bitte erst ein Bild hochladen!');
        return;
    }
    
    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');
    
    let width = parseInt(document.getElementById('imageWidth').value);
    let height = parseInt(document.getElementById('imageHeight').value);
    
    if (document.getElementById('keepAspect').checked) {
        const ratio = originalImage.width / originalImage.height;
        if (width && !height) {
            height = width / ratio;
        } else if (height && !width) {
            width = height * ratio;
        }
    }
    
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(originalImage, 0, 0, width, height);
    
    canvas.style.display = 'block';
    document.getElementById('downloadBtn').style.display = 'block';
}

function downloadResizedImage() {
    const canvas = document.getElementById('imageCanvas');
    canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resized-image.png';
        a.click();
    });
}

// Unix Timestamp
function timestampToDate() {
    const timestamp = parseInt(document.getElementById('timestampInput').value);
    const date = new Date(timestamp * 1000);
    showResult('timestampResult', `Datum: ${date.toLocaleString('de-DE')}`, true);
}

function dateToTimestamp() {
    const dateStr = document.getElementById('dateInput').value;
    const timestamp = Math.floor(new Date(dateStr).getTime() / 1000);
    showResult('timestampResult', `Timestamp: ${timestamp}`, true);
}

function currentTimestamp() {
    const timestamp = Math.floor(Date.now() / 1000);
    showResult('timestampResult', `Aktueller Timestamp: ${timestamp}`, true);
}

// Number Base Converter
function convertNumberBase() {
    const input = document.getElementById('numberInput').value;
    const base = parseInt(document.getElementById('inputBase').value);
    
    try {
        const decimal = parseInt(input, base);
        const result = `
            <strong>Dezimal:</strong> ${decimal}<br>
            <strong>Binär:</strong> ${decimal.toString(2)}<br>
            <strong>Oktal:</strong> ${decimal.toString(8)}<br>
            <strong>Hexadezimal:</strong> ${decimal.toString(16).toUpperCase()}
        `;
        showResult('baseResult', result, true);
    } catch (e) {
        showResult('baseResult', 'Ungültige Eingabe!', false);
    }
}

// Video URL Analyzer
function analyzeVideoUrl() {
    const url = document.getElementById('videoUrl').value;
    
    let result = '<strong>URL Informationen:</strong><br><br>';
    
    // YouTube
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    if (ytMatch) {
        result += `<strong>Plattform:</strong> YouTube<br>`;
        result += `<strong>Video ID:</strong> ${ytMatch[1]}<br>`;
        result += `<strong>Embed URL:</strong> https://www.youtube.com/embed/${ytMatch[1]}`;
    }
    // Vimeo
    else if (url.includes('vimeo.com')) {
        const vimeoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
        result += `<strong>Plattform:</strong> Vimeo<br>`;
        result += `<strong>Video ID:</strong> ${vimeoId}`;
    }
    else {
        result = 'Keine unterstützte Video-Plattform erkannt.';
    }
    
    showResult('videoResult', result, true);
}

// BMI Calculator
function calculateBMI() {
    const height = parseFloat(document.getElementById('bmiHeight').value) / 100;
    const weight = parseFloat(document.getElementById('bmiWeight').value);
    
    const bmi = weight / (height * height);
    let category = '';
    
    if (bmi < 18.5) category = 'Untergewicht';
    else if (bmi < 25) category = 'Normalgewicht';
    else if (bmi < 30) category = 'Übergewicht';
    else category = 'Adipositas';
    
    const result = `
        <strong>BMI:</strong> ${bmi.toFixed(1)}<br>
        <strong>Kategorie:</strong> ${category}
    `;
    
    showResult('bmiResult', result, true);
}

// Loan Calculator
function calculateLoan() {
    const amount = parseFloat(document.getElementById('loanAmount').value);
    const rate = parseFloat(document.getElementById('loanRate').value) / 100 / 12;
    const months = parseInt(document.getElementById('loanMonths').value);
    
    const payment = amount * rate * Math.pow(1 + rate, months) / (Math.pow(1 + rate, months) - 1);
    const total = payment * months;
    const interest = total - amount;
    
    const result = `
        <strong>Monatliche Rate:</strong> ${payment.toFixed(2)} €<br>
        <strong>Gesamtbetrag:</strong> ${total.toFixed(2)} €<br>
        <strong>Zinsen gesamt:</strong> ${interest.toFixed(2)} €
    `;
    
    showResult('loanResult', result, true);
}

// Tip Calculator
function updateTipPercent() {
    document.getElementById('tipPercentDisplay').textContent = 
        document.getElementById('tipPercent').value + '%';
}

function calculateTip() {
    const bill = parseFloat(document.getElementById('billAmount').value);
    const tipPercent = parseFloat(document.getElementById('tipPercent').value) / 100;
    const persons = parseInt(document.getElementById('tipPersons').value);
    
    const tip = bill * tipPercent;
    const total = bill + tip;
    const perPerson = total / persons;
    
    const result = `
        <strong>Trinkgeld:</strong> ${tip.toFixed(2)} €<br>
        <strong>Gesamt:</strong> ${total.toFixed(2)} €<br>
        <strong>Pro Person:</strong> ${perPerson.toFixed(2)} €
    `;
    
    showResult('tipResult', result, true);
}

// Grade Calculator
function calculateGrades() {
    const input = document.getElementById('gradesInput').value;
    const grades = input.split('\n').map(g => parseFloat(g.replace(',', '.'))).filter(g => !isNaN(g));
    
    if (grades.length === 0) {
        showResult('gradesResult', 'Bitte Noten eingeben!', false);
        return;
    }
    
    const average = grades.reduce((a, b) => a + b, 0) / grades.length;
    const best = Math.min(...grades);
    const worst = Math.max(...grades);
    
    const result = `
        <strong>Durchschnitt:</strong> ${average.toFixed(2)}<br>
        <strong>Beste Note:</strong> ${best.toFixed(2)}<br>
        <strong>Schlechteste Note:</strong> ${worst.toFixed(2)}<br>
        <strong>Anzahl Noten:</strong> ${grades.length}
    `;
    
    showResult('gradesResult', result, true);
}

// Random Color Generator
function generateRandomColors() {
    const palette = document.getElementById('colorPalette');
    palette.innerHTML = '';
    
    for (let i = 0; i < 5; i++) {
        const color = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
        const div = document.createElement('div');
        div.style.cssText = `
            background: ${color};
            height: 150px;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border: 2px solid var(--border);
        `;
        div.innerHTML = `
            <div style="background: rgba(0,0,0,0.7); padding: 10px; border-radius: 5px; color: white; font-weight: bold;">
                ${color}
            </div>
        `;
        div.onclick = () => copyToClipboard(color);
        palette.appendChild(div);
    }
}

// Fake Name Generator
const firstNamesMale = ['Max', 'Tom', 'Leon', 'Felix', 'Noah', 'Paul', 'Jonas', 'Lukas', 'Tim', 'Jan'];
const firstNamesFemale = ['Anna', 'Laura', 'Lena', 'Sarah', 'Emma', 'Sophie', 'Marie', 'Lisa', 'Julia', 'Mia'];
const lastNames = ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann'];
const cities = ['Berlin', 'München', 'Hamburg', 'Köln', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Leipzig', 'Dresden', 'Hannover'];

function generateFakeName() {
    const gender = document.getElementById('nameGender').value;
    let firstName;
    
    if (gender === 'male') {
        firstName = firstNamesMale[Math.floor(Math.random() * firstNamesMale.length)];
    } else if (gender === 'female') {
        firstName = firstNamesFemale[Math.floor(Math.random() * firstNamesFemale.length)];
    } else {
        const allNames = [...firstNamesMale, ...firstNamesFemale];
        firstName = allNames[Math.floor(Math.random() * allNames.length)];
    }
    
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const age = Math.floor(Math.random() * 50) + 20;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
    
    const result = `
        <strong>Name:</strong> ${firstName} ${lastName}<br>
        <strong>Alter:</strong> ${age} Jahre<br>
        <strong>Stadt:</strong> ${city}<br>
        <strong>Email:</strong> ${email}
    `;
    
    showResult('fakeNameResult', result, true);
}

// Random Number Generator
function generateRandomNumbers() {
    const min = parseInt(document.getElementById('randomMin').value);
    const max = parseInt(document.getElementById('randomMax').value);
    const count = parseInt(document.getElementById('randomCount').value);
    
    const numbers = [];
    for (let i = 0; i < count; i++) {
        numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    
    const resultBox = document.getElementById('randomResult');
    resultBox.innerHTML = `<strong>Zufallszahlen:</strong><br>${numbers.join(', ')}`;
    resultBox.style.display = 'block';
}

// Email Signature Generator
function generateEmailSignature() {
    const name = document.getElementById('sigName').value;
    const position = document.getElementById('sigPosition').value;
    const email = document.getElementById('sigEmail').value;
    const phone = document.getElementById('sigPhone').value;
    
    const signature = `
<div style="font-family: Arial, sans-serif; color: #333;">
    <strong style="font-size: 16px;">${name}</strong><br>
    <span style="color: #666;">${position}</span><br><br>
    <span>📧 ${email}</span><br>
    <span>📞 ${phone}</span>
</div>
    `.trim();
    
    const resultBox = document.getElementById('sigResult');
    resultBox.innerHTML = `<strong>HTML Code:</strong><br><textarea readonly style="width:100%; height:150px; background: var(--background); color: var(--text); border: 1px solid var(--border); padding: 10px; border-radius: 5px;">${signature}</textarea>`;
    resultBox.style.display = 'block';
}

// URL Parser
function parseURL() {
    const urlStr = document.getElementById('urlInput').value;
    
    try {
        const url = new URL(urlStr);
        const params = new URLSearchParams(url.search);
        
        let result = `
            <strong>Protocol:</strong> ${url.protocol}<br>
            <strong>Host:</strong> ${url.host}<br>
            <strong>Path:</strong> ${url.pathname}<br>
        `;
        
        if (params.toString()) {
            result += '<br><strong>Parameter:</strong><br>';
            params.forEach((value, key) => {
                result += `${key}: ${value}<br>`;
            });
        }
        
        showResult('urlResult', result, true);
    } catch (e) {
        showResult('urlResult', 'Ungültige URL!', false);
    }
}

// Hash Generator
async function generateHash(type) {
    const text = document.getElementById('hashInput').value;
    let hash;
    
    if (type === 'md5') {
        // Simple MD5-like hash (not cryptographically secure)
        hash = simpleHash(text);
    } else {
        // Use SubtleCrypto for SHA
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest(type === 'sha1' ? 'SHA-1' : 'SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    
    showResult('hashResult', `<strong>${type.toUpperCase()}:</strong><br>${hash}`, true);
}

function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(32, '0');
}

// CSS Minifier
function minifyCSS() {
    const css = document.getElementById('cssInput').value;
    const minified = css
        .replace(/\/\*.*?\*\//g, '')
        .replace(/\s+/g, ' ')
        .replace(/\s*([{}:;,])\s*/g, '$1')
        .trim();
    
    showResult('cssResult', minified, true);
}

function beautifyCSS() {
    const css = document.getElementById('cssInput').value;
    const beautified = css
        .replace(/\{/g, ' {\n  ')
        .replace(/\}/g, '\n}\n')
        .replace(/;/g, ';\n  ')
        .replace(/\n\s*\n/g, '\n');
    
    showResult('cssResult', beautified, true);
}

// Regex Tester
function testRegex() {
    const pattern = document.getElementById('regexPattern').value;
    const text = document.getElementById('regexTest').value;
    const global = document.getElementById('regexGlobal').checked;
    const caseInsensitive = document.getElementById('regexCase').checked;
    
    try {
        let flags = '';
        if (global) flags += 'g';
        if (caseInsensitive) flags += 'i';
        
        const regex = new RegExp(pattern, flags);
        const matches = text.match(regex);
        
        let result = '';
        if (matches) {
            result = `<strong>✓ ${matches.length} Match(es) gefunden:</strong><br>`;
            matches.forEach((match, i) => {
                result += `${i + 1}. "${match}"<br>`;
            });
        } else {
            result = '<strong>✗ Keine Matches gefunden</strong>';
        }
        
        showResult('regexResult', result, true);
    } catch (e) {
        showResult('regexResult', 'Ungültiger RegEx: ' + e.message, false);
    }
}

// CSV Viewer
function parseCSV() {
    const csv = document.getElementById('csvInput').value;
    const lines = csv.split('\n').filter(line => line.trim());
    
    if (lines.length === 0) {
        showResult('csvResult', 'Keine Daten eingegeben!', false);
        return;
    }
    
    let table = '<table style="width:100%; border-collapse: collapse; text-align: left;">';
    
    lines.forEach((line, index) => {
        const cells = line.split(',');
        table += '<tr>';
        cells.forEach(cell => {
            const tag = index === 0 ? 'th' : 'td';
            table += `<${tag} style="border: 1px solid var(--border); padding: 8px;">${cell.trim()}</${tag}>`;
        });
        table += '</tr>';
    });
    
    table += '</table>';
    showResult('csvResult', table, true);
}

// Speed Test / Reaction Test
let speedTestActive = false;
let speedTestTimeout = null;
let speedStartTime = 0;

function startSpeedTest() {
    const box = document.getElementById('speedBox');
    box.style.background = 'var(--danger)';
    box.textContent = 'Warte...';
    speedTestActive = false;
    
    const delay = Math.random() * 3000 + 2000; // 2-5 seconds
    
    speedTestTimeout = setTimeout(() => {
        box.style.background = 'var(--success)';
        box.textContent = 'KLICK JETZT!';
        speedTestActive = true;
        speedStartTime = Date.now();
    }, delay);
}

function speedClick() {
    if (!speedTestActive && speedStartTime === 0) return;
    
    if (!speedTestActive) {
        clearTimeout(speedTestTimeout);
        const box = document.getElementById('speedBox');
        box.style.background = 'var(--surface-light)';
        box.textContent = 'Zu früh! Versuch es nochmal.';
        showResult('speedResult', '❌ Zu früh geklickt!', false);
        speedStartTime = 0;
        return;
    }
    
    const reactionTime = Date.now() - speedStartTime;
    speedTestActive = false;
    speedStartTime = 0;
    
    const box = document.getElementById('speedBox');
    box.style.background = 'var(--surface-light)';
    box.textContent = 'Klick hier!';
    
    let rating = '';
    if (reactionTime < 200) rating = '🚀 Unglaublich schnell!';
    else if (reactionTime < 300) rating = '⚡ Sehr gut!';
    else if (reactionTime < 400) rating = '👍 Gut!';
    else if (reactionTime < 500) rating = '👌 Okay';
    else rating = '🐢 Übe weiter!';
    
    showResult('speedResult', `<strong>Reaktionszeit:</strong> ${reactionTime}ms<br>${rating}`, true);
}

function resetSpeedTest() {
    clearTimeout(speedTestTimeout);
    speedTestActive = false;
    speedStartTime = 0;
    
    const box = document.getElementById('speedBox');
    box.style.background = 'var(--surface-light)';
    box.textContent = 'Klick hier!';
    
    document.getElementById('speedResult').style.display = 'none';
}
