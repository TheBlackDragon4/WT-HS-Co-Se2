"use strict";//Strict Mode verhindert, dass fehleranfällige Features verwendet werden
window.onload = init;//ruft die Funktion init auf, sobald das HTML Dokument vollständig geladen wurde
let bricks = [];
function init()
{
  domWalker(document.querySelector("body").firstElementChild);
  outPut();

  //test
  const gg = document.querySelector("body").firstElementChild;
  // gg.
  //test
}
function domWalker(actElem)
{

  if (!is_ignorable(actElem))
    readElement(actElem);
  if (actElem.hasChildNodes())
    domWalker(actElem.firstChild);
  if (actElem.nextSibling != null)
    domWalker(actElem.nextSibling);


  // if (!is_ignorable(actElem))
  //   readElement(actElem);
  // if (actElem.firstElementChild != null)
  //   domWalker(actElem.firstElementChild);
  // if (actElem.nextElementSibling != null)
  //   domWalker(actElem.nextElementSibling);
}
function readElment(actItem)
{
    let tmpString = "";
    tmpString = actItem.nodeName;
    switch (actItem.nodeType) 
    {
      case 1:
        tmpString += " (Element_Node): ";
        break;
      case 2:
        tmpString += " (Attribute_Node): ";
        break;
      case 3:
        tmpString += " (Text_Node): ";
        break;
      case 8:
        tmpString += " (Comment_Node): ";
        break;
      default:
        tmpString += " (???): ";
        break;
    }
    tmpString += actItem.nodeValue;
    brickAdder(tmpString);
    if (actItem.attributes != null)
    {
      for (let i = 0; i < actItem.attributes.length; i++)
      {
        brickAdder("|_Attr: " + actItem.attributes.item(i).name + " = " + actItem.attributes.item(i).value);
      }
      if (!is_all_ws(actItem))
      {
        brickAdder("|_#text(Text_Node): " + actItem.innerHTML);
      }
      brickAdder("_________"); //Trennstrich
    }
  }

function brickAdder(txt) //das Array "bricks" ein neues html-Element hinzufügen
{
  let neuerAbsatz = document.createElement("p");
  neuerAbsatz.appendChild(document.createTextNode(txt));//Text über Knoten
  bricks.push(neuerAbsatz);
}
function outPut() //alle neuen html-Elemente dem Body hinzufügen
{
  for (let i = 0; i < bricks.length; i++)
  {
    document.body.appendChild(bricks[i]);
  }
}
function is_all_ws(nod) // Pruefung, ob Knoten nur Whitespace (ws) beinhaltet
{
  // Use ECMA-262 Edition 3 String and RegExp features
  return !(/[^\t\n\r ]/.test(nod.textContent));
}
// Hier wird festgelegt, unter welchen Bedingungen ein
// Knoten nicht beachtet werden soll
function is_ignorable(nod)
{
  return (nod.nodeType == 8) || // Kommentar-Knoten
    (nod.nodeName == "SCRIPT") || // Skript-Knoten
    ((nod.nodeType == 3) && is_all_ws(nod)); // Text-Knoten, alles ws
}