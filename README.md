# BITS-SRCD

## The setup for now

https://srcd-temp.herokuapp.com/submit 
This URL accepts a POST request. 
Specify enctype="multipart/form-data" in the form you might use to submit the POST request. 
Fields and datatype expected :-
1. 'docs' -> Expects any number of pdf files
2. 'title' -> Expects a string

On unsuccessful execution, HTTP status 500 will be returned.
On successful execution, HTTP status 200 will be returned with JSON data having the following fields
id -> Object ID generated for that submission
title -> Title returned back
count -> Number of documents in the submission


https://srcd-temp.herokuapp.com/check/:id/:num
This URL accepts a GET request and returns a single pdf of the submission with Object ID == id.
All the pdfs can be accessed by changing value of num from 0 to count-1 (count of the corresspong submission)

The previously sent data on submission and requests to this endpoint would be enough to display all the data of a submission.

