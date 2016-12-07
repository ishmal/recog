
//favor the webkit versions
var SpeechRecognition = webkitSpeechRecognition || SpeechRecognition
var SpeechGrammarList = webkitSpeechGrammarList || SpeechGrammarList
var SpeechRecognitionEvent = webkitSpeechRecognitionEvent || SpeechRecognitionEvent



function setup() {

  var button = document.querySelector('.startbtn');
  var output = document.querySelector('.output');

  var csgrammar = '#JSGF 1.0 ISO8559-1;\ngrammar org.pedro.callsign;\npublic <callsign> = <letter>+ <number>+ <letter>+;\n\n<letter> = <a> | <b> | <c> | <d> | <e> | <f> | <g> | <h> | <i> | <j> | <k> |\n  <l> | <m> | <n> | <o> | <p> | <q> | <r> | <s> |\n   <t> | <u> | <v> | <w> | <x> | <y> | <z>;\n\n<a> = a alfa alpha america;\n<b> = b | beta | bravo;\n<c> = c | charlie;\n<d> = d | delta;\n<e> = e | echo;\n<f> = f | fox | foxtrot | florida;\n<g> = g | golf | george;\n<h> = h | hotel;\n<i> = i | india;\n<j> = j | juliet | juliett;\n<k> = k | kilo | kilowatt;\n<l> = l | lima;\n<m> = m | mike;\n<n> = n | nancy | november;\n<o> = o | oscar;\n<p> = p | papa;\n<q> = q | quebec;\n<r> = r | romeo;\n<s> = s | sierra;\n<t> = t | tango;\n<u> = u | uniform;\n<v> = v | victor;\n<w> = w | whiskey | whisky;\n<x> = x | xray | x-ray ;\n<y> = y | yankee;\n<z> = z | zulu | zebra | zanzibar;\n\n<number> = <0> | <1> | <2> | <3> | <4> | <5> | <6> | <7> | <8> | <9>;\n\n<0> = 0 | zero;\n<1> = 1 | one;\n<2> = 2 | two;\n<3> = 3 | three | tree;\n<4> = 4 | four;\n<5> = 5 | five;\n<6> = 6 | six;\n<7> = 7 | seven;\n<8> = 8 | eight;\n<9> = 9 | nine | niner;\n';
  var recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(csgrammar, 1);
  recognition.grammars = speechRecognitionList;
  //recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;


  button.onclick = function() {
    recognition.start();
    console.log('Ready to receive a command');
  }

  recognition.onresult = function(event) {
    var last = event.results.length - 1;
    var text = event.results[last][0].transcript;

    output.textContent = 'Result received: ' + text + '.';
    console.log('Confidence: ' + event.results[0][0].confidence);
  }

  recognition.onspeechend = function() {
    recognition.stop();
  }

  recognition.onnomatch = function(event) {
    output.textContent = "I didn't recognise that statement.";
  }

  recognition.onerror = function(event) {
    output.textContent = 'Error occurred in recognition: ' + event.error + " : " + event.message;
  }

}

window.onload = setup;
