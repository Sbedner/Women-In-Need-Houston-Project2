// When form is submitted on members.hbrs page, this code responds
$(document).ready(function() {

  var nameInput = $("#resource-name");
  var resourceList = $("tbody");
  var resourceContainer = $(".resource-container");

//Event listener to list resources
  $(document).on("submit", "#dashboardListAll", handleFormSubmit);

// checked to this point!***********************************

// TBD later :
 //Event listener for delete resource button  
//   $(document).on("click", ".delete-resource", handleDeleteButtonPress);

// Member request to view resources, this function gets the resources
//   getResources();

// A function for handling what happens when the form to create a new post is submitted
function handleFormSubmit(event) {
  event.preventDefault();
  alert("you hit here 1st")
  getResources(); 
}

    // get resources from DB and get ready to post on members dashboard in table (****fix this function to do that)
    function getResources() {
      alert("you hit here 2nd")
     

        $.get("/getresources", function(data) {
            console.log(data);
          var rowsToAdd = [];
          for (var i = 0; i < data.length; i++) {
            rowsToAdd.push(createResourceRow(data[i]));
          }
          renderResourceList(rowsToAdd);
          nameInput.val("");
        });
      }

// Function for creating a new list row for resources
function createResourceRow(resourceData) {
    console.log(resourceData);
    var newTr = $("<tr>");
    newTr.data("resource", resourceData);

    newTr.append(`<td> ${resourceData.location} </td>`);

    newTr.append(`<td> <span class="font-weight-bold">${resourceData.name}</span> <br> ${resourceData.address} <br> ${resourceData.phone} </td>`);
   
    newTr.append(`<td> <a href="${resourceData.website}">${resourceData.website}</a></td>`);

    newTr.append(`<td><mailto:"${resourceData.email}">${resourceData.email}</a></td>`);
    
    // newTr.append("<td><a style='cursor:pointer;color:red' class='delete-resource'>Delete Author</a></td>");
    return newTr;
  }

  //  integrate this example code for actually posting the ready to go resource fdata to the page
      //// A function for rendering the list of resources to the page

  function renderResourceList(rows) {
   resourceList.children().not(":last").remove();
   resourceContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      resourceList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no authors
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("No resources available at this time");
    resourceContainer.append(alertDiv);
  }



//  TBD later:    // Function for handling what happens when the delete button is pressed
//   function handleDeleteButtonPress() {
//     var listItemData = $(this).parent("td").parent("tr").data("resource");
//     var id = listItemData.id;
//     $.ajax({
//       method: "DELETE",
//       url: "/api/resources/" + id
//     })
//       .then(getResources);
//   }



});