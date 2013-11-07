# Trello Id Extractor

This little piece of code adds the Id of each card before its title.

## Usage

Create a bookmark in your browser and add the following code as the address:

    javascript: (function() {
      s = document.createElement('script');
      s.setAttribute('type', 'text/javascript');
      s.setAttribute('src', 'https://raw.github.com/simplificator/trello-id-extractor/master/load.js');
      document.body.appendChild(s);
    })();
