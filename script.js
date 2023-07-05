document.addEventListener("DOMContentLoaded", () => {
  const filmListContainer = document.getElementById("film-list");
  const filmDetailsContainer = document.getElementById("film-details-container");

  // Fetch films from the API or JSON file
  fetch("db.json")
    .then(response => response.json())
    .then(data => {
      const films = data.films;
      films.forEach((film, index) => {
        const filmElement = document.createElement("div");
        filmElement.classList.add("film");
        filmElement.textContent = film.title;

        filmElement.addEventListener("click", () => {
          // Clear existing film details
          filmDetailsContainer.innerHTML = "";

          // Create film details elements
          const titleElement = document.createElement("h2");
          titleElement.textContent = film.title;

          const runtimeElement = document.createElement("p");
          runtimeElement.textContent = `Runtime: ${film.runtime} minutes`;

          const capacityElement = document.createElement("p");
          capacityElement.textContent = `Capacity: ${film.capacity}`;

          const showtimeElement = document.createElement("p");
          showtimeElement.textContent = `Showtime: ${film.showtime}`;

          const ticketsSoldElement = document.createElement("p");
          ticketsSoldElement.textContent = `Tickets Sold: ${film.tickets_sold}`;

          const descriptionElement = document.createElement("p");
          descriptionElement.textContent = film.description;

          const posterElement = document.createElement("img");
          posterElement.src = film.poster;

          const buyTicketButton = document.createElement("button");
          buyTicketButton.textContent = "Buy Ticket";
          buyTicketButton.addEventListener("click", () => {
            buyMovieTicket(film, ticketsSoldElement, capacityElement);
          });

          // Append film details to the container
          filmDetailsContainer.appendChild(titleElement);
          filmDetailsContainer.appendChild(runtimeElement);
          filmDetailsContainer.appendChild(capacityElement);
          filmDetailsContainer.appendChild(showtimeElement);
          filmDetailsContainer.appendChild(ticketsSoldElement);
          filmDetailsContainer.appendChild(descriptionElement);
          filmDetailsContainer.appendChild(posterElement);
          filmDetailsContainer.appendChild(buyTicketButton);
        });

        // Append film to the film list
        filmListContainer.appendChild(filmElement);

        // Display details of the first movie automatically
        if (index === 0) {
          filmElement.click();
        }
      });

      function buyMovieTicket(film, ticketsSoldElement, buyTicketButton) {
        if (film.tickets_sold < film.capacity) {
          film.tickets_sold++;
          ticketsSoldElement.textContent = `Tickets Sold: ${film.tickets_sold}`;
          console.log(`You have successfully bought a ticket for "${film.title}". Enjoy the show!`);
      
          if (film.tickets_sold >= film.capacity) {
            buyTicketButton.disabled = true;
            prompt(`Sorry, the movie "${film.title}" is sold out.`);
          }
        } else {
          prompt(`Sorry, the movie "${film.title}" is sold out.`);
        }
      }
      
      
    })
    .catch(error => {
      console.error("Error fetching films:", error);
    });
    
});
