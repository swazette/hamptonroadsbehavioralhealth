// Updated SEO implementation with Hampton Roads tag focus
// This script will update the meta tags and structured data to emphasize Hampton Roads

document.addEventListener('DOMContentLoaded', function() {
  // Update meta tags to emphasize Hampton Roads
  updateMetaTags();
  
  // Load provider data from JSON file
  fetch('provider_data.json')
    .then(response => response.json())
    .then(data => {
      // Store the provider data globally
      window.providerData = data;
      
      // Display all providers initially
      displayProviders(data);
      
      // Set up event listeners
      document.getElementById('showAllBtn').addEventListener('click', function() {
        displayProviders(window.providerData);
        
        // Uncheck all filter checkboxes
        document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
          checkbox.checked = false;
        });
        
        // Update page title for better SEO when showing all providers
        document.title = "Behavioral Health Providers in Hampton Roads, VA | Mental Health Directory";
      });
      
      document.getElementById('filterBtn').addEventListener('click', function() {
        applyFilters();
      });
      
      // Set up contact form submission
      document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // In a real application, this would send the data to a server
        alert(`Thank you, ${name}! Your message has been received. We will contact you at ${email} shortly.`);
        
        // Reset the form
        document.getElementById('contactForm').reset();
      });
    })
    .catch(error => {
      console.error('Error loading provider data:', error);
      document.getElementById('providerList').innerHTML = `
        <div class="col-12">
          <div class="alert alert-danger" role="alert">
            Error loading provider data. Please try again later.
          </div>
        </div>
      `;
    });
});

// Function to update meta tags with Hampton Roads focus
function updateMetaTags() {
  // Update title tag
  document.title = "Behavioral Health Providers in Hampton Roads, VA | Mental Health Directory";
  
  // Update meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', 'Find licensed behavioral health providers in Hampton Roads, Virginia including Hampton, Newport News, Virginia Beach, Portsmouth, and Norfolk. Comprehensive directory of mental health and substance abuse treatment services.');
  
  // Update keywords with Hampton Roads focus
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    document.head.appendChild(metaKeywords);
  }
  metaKeywords.setAttribute('content', 'behavioral health Hampton Roads, mental health services Hampton Roads, substance abuse treatment Hampton Roads, mental health skill building Virginia, intensive outpatient program Hampton Roads, community stabilization services Hampton Roads, Medicaid mental health providers Virginia, behavioral health directory Hampton Roads, substance abuse counseling Hampton Roads, mental health resources Virginia');
  
  // Update Open Graph tags
  updateOpenGraphTag('title', 'Behavioral Health Providers in Hampton Roads, VA');
  updateOpenGraphTag('description', 'Find licensed behavioral health providers in Hampton Roads, Virginia including Hampton, Newport News, Virginia Beach, Portsmouth, and Norfolk. Comprehensive directory of mental health and substance abuse treatment services.');
  
  // Update Twitter tags
  updateTwitterTag('title', 'Behavioral Health Providers in Hampton Roads, VA');
  updateTwitterTag('description', 'Find licensed behavioral health providers in Hampton Roads, Virginia including Hampton, Newport News, Virginia Beach, Portsmouth, and Norfolk. Comprehensive directory of mental health and substance abuse treatment services.');
  
  // Update geo tags
  updateGeoTag('region', 'US-VA');
  updateGeoTag('placename', 'Hampton Roads, Hampton, Newport News, Virginia Beach, Portsmouth, Norfolk');
  
  // Update structured data to emphasize Hampton Roads
  updateStructuredData();
}

// Helper function to update Open Graph tags
function updateOpenGraphTag(property, content) {
  let tag = document.querySelector(`meta[property="og:${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', `og:${property}`);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

// Helper function to update Twitter tags
function updateTwitterTag(property, content) {
  let tag = document.querySelector(`meta[property="twitter:${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', `twitter:${property}`);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

// Helper function to update geo tags
function updateGeoTag(property, content) {
  let tag = document.querySelector(`meta[name="geo.${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', `geo.${property}`);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

// Function to update structured data with Hampton Roads focus
function updateStructuredData() {
  // Remove existing structured data
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }
  
  // Create new structured data with Hampton Roads focus
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": "Hampton Roads Behavioral Health Provider Directory",
    "description": "A comprehensive directory of licensed behavioral health providers in Hampton Roads, Virginia, offering mental health and substance abuse services.",
    "url": window.location.href,
    "areaServed": [
      {
        "@type": "Region",
        "name": "Hampton Roads",
        "containedInPlace": {
          "@type": "State",
          "name": "Virginia"
        }
      },
      {
        "@type": "City",
        "name": "Hampton",
        "containedInPlace": {
          "@type": "Region",
          "name": "Hampton Roads"
        }
      },
      {
        "@type": "City",
        "name": "Newport News",
        "containedInPlace": {
          "@type": "Region",
          "name": "Hampton Roads"
        }
      },
      {
        "@type": "City",
        "name": "Virginia Beach",
        "containedInPlace": {
          "@type": "Region",
          "name": "Hampton Roads"
        }
      },
      {
        "@type": "City",
        "name": "Portsmouth",
        "containedInPlace": {
          "@type": "Region",
          "name": "Hampton Roads"
        }
      },
      {
        "@type": "City",
        "name": "Norfolk",
        "containedInPlace": {
          "@type": "Region",
          "name": "Hampton Roads"
        }
      }
    ],
    "serviceType": [
      "Mental Health Skill Building",
      "Partial Hospitalization Program",
      "Intensive Outpatient Program",
      "Community Stabilization",
      "Intensive In-Home Services",
      "Substance Abuse Treatment"
    ]
  };
  
  // Add the new structured data to the page
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
}

// Function to display providers with improved accessibility and SEO
function displayProviders(providers) {
  const providerList = document.getElementById('providerList');
  
  // Clear existing content
  providerList.innerHTML = '';
  
  if (providers.length === 0) {
    providerList.innerHTML = `
      <div class="col-12">
        <div class="alert alert-info" role="alert">
          No providers match your selected filters. Please try different criteria.
        </div>
      </div>
    `;
    return;
  }
  
  // Create a card for each provider with improved semantic HTML and accessibility
  providers.forEach(provider => {
    const card = document.createElement('div');
    card.className = 'col-lg-6 provider-card';
    
    // Create service badges
    const serviceBadges = [];
    if (provider.services.mentalHealthSkillBuilding) {
      serviceBadges.push('<span class="service-badge">Mental Health Skill Building</span>');
    }
    if (provider.services.php) {
      serviceBadges.push('<span class="service-badge">Partial Hospitalization Program</span>');
    }
    if (provider.services.iop) {
      serviceBadges.push('<span class="service-badge">Intensive Outpatient Program</span>');
    }
    if (provider.services.communityStabilization) {
      serviceBadges.push('<span class="service-badge">Community Stabilization</span>');
    }
    if (provider.services.iih) {
      serviceBadges.push('<span class="service-badge">Intensive In-Home Services</span>');
    }
    if (provider.services.substanceAbuse) {
      serviceBadges.push('<span class="service-badge">Substance Abuse Services</span>');
    }
    
    // Create provider card with semantic HTML and ARIA attributes
    card.innerHTML = `
      <article class="card h-100">
        <header class="card-header">
          <h3 class="mb-0">${provider.name}</h3>
        </header>
        <div class="card-body">
          <div class="services-offered" aria-label="Services offered">
            ${serviceBadges.join('')}
          </div>
          <address class="contact-info">
            <p><strong>Address:</strong> ${provider.address}, ${provider.city}, ${provider.state} ${provider.zip}</p>
            <p><strong>Phone:</strong> <a href="tel:${provider.phone.replace(/[^0-9]/g, '')}" aria-label="Call ${provider.name}">${provider.phone}</a></p>
            <p><strong>Notes:</strong> ${provider.notes || 'No additional information available.'}</p>
            <a href="${provider.website}" target="_blank" rel="noopener" class="btn btn-website" aria-label="Visit ${provider.name} website">Visit Website</a>
          </address>
        </div>
      </article>
    `;
    
    // Add structured data for each provider with Hampton Roads region
    const providerSchema = document.createElement('script');
    providerSchema.type = 'application/ld+json';
    
    // Create schema.org JSON-LD for this provider
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "MedicalOrganization",
      "name": provider.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": provider.address,
        "addressLocality": provider.city,
        "addressRegion": provider.state,
        "postalCode": provider.zip
      },
      "telephone": provider.phone,
      "url": provider.website !== "#" ? provider.website : null,
      "medicalSpecialty": getSpecialties(provider.services),
      "areaServed": {
        "@type": "Region",
        "name": "Hampton Roads",
        "containedInPlace": {
          "@type": "State",
          "name": "Virginia"
        }
      }
    };
    
    providerSchema.textContent = JSON.stringify(schemaData);
    card.appendChild(providerSchema);
    
    providerList.appendChild(card);
  });
  
  // Update page title based on filtered results
  updatePageTitle(providers);
}

// Helper function to get specialties from services
function getSpecialties(services) {
  const specialties = [];
  
  if (services.mentalHealthSkillBuilding) specialties.push("Mental Health Skill Building");
  if (services.php) specialties.push("Partial Hospitalization Program");
  if (services.iop) specialties.push("Intensive Outpatient Program");
  if (services.communityStabilization) specialties.push("Community Stabilization");
  if (services.iih) specialties.push("Intensive In-Home Services");
  if (services.substanceAbuse) specialties.push("Substance Abuse Treatment");
  
  return specialties;
}

// Function to update page title based on filtered results for better SEO
function updatePageTitle(providers) {
  // Count services
  let mhsbCount = 0, phpCount = 0, iopCount = 0, csCount = 0, iihCount = 0, saCount = 0;
  
  providers.forEach(provider => {
    if (provider.services.mentalHealthSkillBuilding) mhsbCount++;
    if (provider.services.php) phpCount++;
    if (provider.services.iop) iopCount++;
    if (provider.services.communityStabilization) csCount++;
    if (provider.services.iih) iihCount++;
    if (provider.services.substanceAbuse) saCount++;
  });
  
  // Determine most common service
  const serviceCounts = [
    { name: "Mental Health Skill Building", count: mhsbCount },
    { name: "Partial Hospitalization", count: phpCount },
    { name: "Intensive Outpatient", count: iopCount },
    { name: "Community Stabilization", count: csCount },
    { name: "Intensive In-Home", count: iihCount },
    { name: "Substance Abuse", count: saCount }
  ];
  
  serviceCounts.sort((a, b) => b.count - a.count);
  
  // If filtering has been applied, update title to reflect that
  if (serviceCounts[0].count > 0 && serviceCounts[0].count < providers.length) {
    document.title = `${serviceCounts[0].name} Providers in Hampton Roads, VA | ${serviceCounts[0].count} Providers`;
  } else {
    document.title = "Behavioral Health Providers in Hampton Roads, VA | Mental Health Directory";
  }
}

// Function to apply filters with improved tracking
function applyFilters() {
  // Get all checked filters
  const mhsb = document.getElementById('mhsbCheck').checked;
  const php = document.getElementById('phpCheck').checked;
  const iop = document.getElementById('iopCheck').checked;
  const cs = document.getElementById('csCheck').checked;
  const iih = document.getElementById('iihCheck').checked;
  const sa = document.getElementById('saCheck').checked;
  
  // Track which filters were applied (would typically send to analytics)
  const appliedFilters = [];
  if (mhsb) appliedFilters.push("Mental Health Skill Building");
  if (php) appliedFilters.push("Partial Hospitalization Program");
  if (iop) appliedFilters.push("Intensive Outpatient Program");
  if (cs) appliedFilters.push("Community Stabilization");
  if (iih) appliedFilters.push("Intensive In-Home Services");
  if (sa) appliedFilters.push("Substance Abuse Services");
  
  console.log("Filters applied:", appliedFilters.join(", "));
  
  // If no filters are selected, show all providers
  if (!mhsb && !php && !iop && !cs && !iih && !sa) {
    displayProviders(window.providerData);
    return;
  }
  
  // Filter providers based on selected services
  const filteredProviders = window.providerData.filter(provider => {
    return (mhsb && provider.services.mentalHealthSkillBuilding) ||
           (php && provider.services.php) ||
           (iop && provider.services.iop) ||
           (cs && provider.services.communityStabilization) ||
           (iih && provider.services.iih) ||
           (sa && provider.services.substanceAbuse);
  });
  
  // Display filtered providers
  displayProviders(filteredProviders);
}
