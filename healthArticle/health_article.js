
// creates a request object
var xhr = new XMLHttpRequest();
// defines the URL of the JSON file
var url = './health_article.json';

// GET request that uses the open method and the url
// True indicates that it is asynchronous
xhr.open('GET', url, true);

// the expected response should be in JSON format
xhr.responseType = 'json';


// what happens if the data is successfully loaded
xhr.onload = function() {
    // retrieves the articles array from the JSON response
    var articles = xhr.response.articles;
    // retrieves the HTML element with the ID 'articles' where the fetched content will be displayed
    var articlesDiv = document.getElementById('articles');
}


// this function creates HTML elements dynamically
// populates the HTML elements with the corresponding content from the JSON data
// attach these elements to the articlesDiv to display each article's details on the webpage
articles.forEach(function(article) {
    var articleDiv = document.createElement('div');
    articleDiv.classList.add('article');

    var title = document.createElement('h2');
    title.textContent = article.title;

    var description = document.createElement('p');
    description.textContent = article.description;

    var waysHeader = document.createElement('h3');
    waysHeader.textContent = 'Ways to Achieve:';

    var waysList = document.createElement('ul');
    article.ways_to_achieve.forEach(function(way) {
      var listItem = document.createElement('li');
      listItem.textContent = way;
      waysList.appendChild(listItem);
    });

    var benefitsHeader = document.createElement('h3');
    benefitsHeader.textContent = 'Benefits:';

    var benefitsList = document.createElement('ul');
    article.benefits.forEach(function(benefit) {
      var listItem = document.createElement('li');
      listItem.textContent = benefit;
      benefitsList.appendChild(listItem);
    });

    articleDiv.appendChild(title);
    articleDiv.appendChild(description);
    articleDiv.appendChild(waysHeader);
    articleDiv.appendChild(waysList);
    articleDiv.appendChild(benefitsHeader);
    articleDiv.appendChild(benefitsList);

    articlesDiv.appendChild(articleDiv);
});



// send the XHR request to fetch the data  
xhr.send();





