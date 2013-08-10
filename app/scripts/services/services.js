'use strict';

/* Services */

/**
 * DataService Module
 *
 *  A collection of services that provide a variety of back-end options for saving
 *  and retrieving data. Parse.com is Backend-as-a-Service company.
 *  They provide easy to use databases for mobile and HTML5 applications.
 */

var KmToLookAroundUserPositionForMap = 500;

angular.module('dataServices', [])

/**
 * Parse Service com as a back-end for the application.
 */
    .factory('parseService', function () {
        // Initialize Parse API and objects. Please don't use this key in your own apps. It won't work anyway.



        //Create Object/Table names with capital first letter, following Parse guidelines.
        var Book = Parse.Object.extend("Book");
        var BookStatus = Parse.Object.extend("BookStatus");

        /**
        * ParseService Object
        * This is what is used by the main controller to save and retrieve data from Parse.com.
        * Moving all the Parse.com specific stuff into a service allows me to later swap it out 
        * with another back-end service provider without modifying my controller much, if at all.
        */
        var parseService = {
            name: "Parse",

                getBooksForMap: function  getBooksForMap(geoPoint, callback)
                {
                     //Get the Actions related to this books ordered chronologically
                     var qBook = new Parse.Query(Book);

                     //qBook.withinKilometers("releasedAt", geoPoint, KmToLookAroundUserPositionForMap)

                     //Only Released actions of others books. (Also Lost ones?)
                     var bookStatus = new BookStatus();
                     bookStatus.id = BookStatusConst.Released;
                     qBook.equalTo("bookStatus",bookStatus);

                     //Book not belongs to me - do we need that one?
                     qBook.notEqualTo("ownedBy", Parse.User.current());

                     //Do we need to order them?
                     qBook.descending("createdAt");

                     // Include the post data with each comment
                     qBook.include("user");
                     qBook.include("bookStatus");

                     qBook.find({
                         success: function (books) {
                             callback(true, books);
                         },
                         error: function (actions, error) {
                             console.log("Error: " + error.code + " " + error.message)
                             callback(false, ErrorConst.GenericError);
                         }
                     });
                }

                //</editor-fold>
    };

        return parseService;
    })

.factory('dataService', function (parseService, $location) {
    // Use the BackboneService by default
    var serviceToUse = parseService;

    return serviceToUse;
});