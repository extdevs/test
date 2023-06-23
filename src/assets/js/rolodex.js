  import '../css/components/_rolodex.scss';

  export default function rolodex() {
    // Rollo text animation
    var rolodexes = document.querySelectorAll("[data-rolodex]");

    if (rolodexes) {
        for (var i = 0; i < rolodexes.length; i++) {
            var sentences = rolodexes[i].dataset.rolodex.split(".");
            setup(rolodexes[i], sentences);
        }

          // Create the additional text hidden from screen
        function setup(rolodex, sentences) {
            sentences.forEach(function (sentence, i) {
              //  console.log(sentence);
              if (sentence !== "") {
                var newNode = document.createElement("p");
                newNode.innerHTML += sentence.replace("+", ".");
                newNode.classList.add("next");
                rolodex.childNodes[
                  rolodex.childNodes.length - 1
                  ].parentNode.insertBefore(
                  newNode,
                  rolodex.childNodes[rolodex.childNodes.length - 1].nextSibling
                  );
              }
            });

            rollText(rolodex);
        }

          // Roll the text
        function rollText(rolodex) {
            var count = 0;

            var roloItems = rolodex.querySelectorAll("p");
            // set rolodex parent item height to height of item TODO: set it to height of largest item
            //  let height = roloItems[0].offsetHeight;
            // rolodex.style.height = height + "px";

            setInterval(function () {
                var last = roloItems[count];
                last.classList.add("last");
                last.classList.remove("next");

                if (count >= roloItems.length - 1) {
                    count = 0;
                } else {
                    count++;
                }

                var current = roloItems[count];
                current.classList.remove("next");
                current.classList.remove("last");

                var next;
                if (count + 1 >= roloItems.length) {
                    next = roloItems[0];
                } else {
                    next = roloItems[count + 1];
                }

                next.classList.add("next");
                next.classList.remove("last");
            
            }, 3000);
        }
    }
}