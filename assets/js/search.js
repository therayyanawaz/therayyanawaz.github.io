// Search functionality
document.addEventListener('DOMContentLoaded', function() {
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  
  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const searchTerm = searchInput.value.trim().toLowerCase();
      
      if (searchTerm.length < 2) {
        alert('Please enter at least 2 characters to search');
        return;
      }
      
      // Content to search through
      const searchableContent = [
        { title: 'Home', url: 'index.html', tags: ['home', 'portfolio', 'projects', 'skills'] },
        { title: 'About', url: 'about.html', tags: ['about', 'profile', 'history', 'skills', 'experience'] },
        { title: 'Services', url: 'services.html', tags: ['services', 'offerings', 'web development', 'design', 'bug hunting'] },
        { title: 'Portfolio', url: 'portfolio.html', tags: ['portfolio', 'projects', 'work', 'samples'] },
        { title: 'Blog', url: 'blog.html', tags: ['blog', 'articles', 'posts', 'tutorials'] },
        { title: 'Contact', url: 'contact.html', tags: ['contact', 'reach out', 'email', 'message'] }
      ];
      
      // Search results
      const results = searchableContent.filter(item => {
        return item.title.toLowerCase().includes(searchTerm) || 
               item.tags.some(tag => tag.includes(searchTerm));
      });
      
      // Display results in a dropdown
      displaySearchResults(results);
    });
  }
  
  function displaySearchResults(results) {
    // Remove any existing results container
    const existingResults = document.querySelector('.search-results-container');
    if (existingResults) {
      existingResults.remove();
    }
    
    // Create results container
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results-container position-absolute bg-white shadow-sm rounded p-2 mt-1';
    resultsContainer.style.width = '300px';
    resultsContainer.style.zIndex = '1000';
    
    if (results.length === 0) {
      const noResults = document.createElement('div');
      noResults.className = 'p-2 text-muted';
      noResults.textContent = 'No results found';
      resultsContainer.appendChild(noResults);
    } else {
      // Create results list
      const resultsList = document.createElement('ul');
      resultsList.className = 'list-unstyled m-0';
      
      results.forEach(result => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = result.url;
        link.className = 'text-decoration-none d-block p-2 text-dark';
        link.textContent = result.title;
        
        link.addEventListener('mouseenter', function() {
          this.classList.add('bg-light');
        });
        
        link.addEventListener('mouseleave', function() {
          this.classList.remove('bg-light');
        });
        
        listItem.appendChild(link);
        resultsList.appendChild(listItem);
      });
      
      resultsContainer.appendChild(resultsList);
    }
    
    // Append results container after the search form
    const searchContainer = document.querySelector('.search-container');
    searchContainer.style.position = 'relative';
    searchContainer.appendChild(resultsContainer);
    
    // Close results when clicking outside
    document.addEventListener('click', function closeResults(e) {
      if (!searchContainer.contains(e.target)) {
        resultsContainer.remove();
        document.removeEventListener('click', closeResults);
      }
    });
  }
}); 