// Description: The portfolio Application
// Programmer: shim hyungoo
// Date : June 5, 2019
// Version: 2.0
// Copyright 2019


// These variable will be using in searchAllBook()
var position = null; 
var index = 0;

// Creating database and open
function openDB(){
    db = window.openDatabase('bookDB', '1.0', 'bookDB', 1024 * 1024);
    console.log("Created Database.");
}

// Creating Table and execute transaction
function createTable(){
    db.transaction(function(tr){
        // Below variable is query statement
        var createSQL = 'create table if not exists book(type text, name text)';
        // executeSql method run SQL query. 
        tr.executeSql(createSQL, [], function(){
            console.log("2_1_Success creating table!");
        }, function(){
            console.log("2_1_Failed to create table...");
        });
        }, function(){
            console.log("2_2_Failed to create table's transaction... rollback will done automatically.");
        }, function(){
            console.log("2_2_Success creating table's transaction!");
        });
}

// Insertion function
function insertBook(){
    db.transaction(function(tr){
        var type = $('#bookGenre1').val();  // Genre (economy, culture, etc)
        console.log(type); 
        var name = $('#bookName1').val(); 
        console.log(name);
        // Below variable is query statement
        var insertSQL = 'insert into book (type, name) values(?, ?)';
        // Run SQL query
        tr.executeSql(insertSQL, [type, name], function(tr, rs){
            console.log(rs);
            console.log('Register Book : no.' + rs.insertId);
            // Display the result to user
            alert($('#bookName1').val() + ' is registered.');
            $('#bookName1').val('');
            $('#bookType1').val('Unknown').attr('selected', 'selected');
            $('#bookType1').selectmenu('refresh');
        },function(tr, err){
            alert("DB Error" + err.message + err.code);
        });
    });
}

// Searching whole data transaction
function searchAllBook(){
    db.transaction(function(tr){
        // Below variable is query statement
        var selectSQL = 'select * from book';
         // Run SQL query
        tr.executeSql(selectSQL, [], function(tr, rs){
            console.log('Searched ' + rs.rows.length + ' times');
            // Matching id of input tag and index of tuple
            if(position == 'first'){
                if(index == 0){
                    alert("No more books.");
                }else{
                    index = 0;
                }
            }else if(position == 'prev'){
                if(index == 0){
                    alert("No more books.");
                }else{
                    index = --index;
                }
            }else if(position == 'next'){
                if(index == rs.rows.length-1){
                    alert('No more books.')
                }else{
                    index = ++index;
                }
            }else{
                if(index == rs.rows.length-1)
                {
                    alert("No more books.");
                }else{
                    index = rs.rows.length-1;
                }
            }
            // Return Book's genre and title to input tag
            $('#bookType4').val(rs.rows.item(index).type);
            $('#bookName4').val(rs.rows.item(index).name);
        });
    });
}

// Update funtion
function updateBook(){
    db.transaction(function(tr){
        var type = $('#bookType2').val();
        var new_name = $('#bookName2').val();
        var old_name = $('#sBookName2').val();
        // Below variable is query statement
        var updateSQL = 'update book set type=?, name=? where name = ?';
         // Run SQL query
        tr.executeSql(updateSQL, [type, new_name. old_name], function(tr, rs){
            console.log('Update the book...');
            // Display the result to user
            alert($('#sBookName2').val() + ' is updated.');
            $('#bookName2').val('');
            $('#sBookName2').val();
            $('#bookType2').val('Undecied').attr('selected', 'selected');
            $('#bookType2').selectmenu('refresh');
        }, function(tr, err){
            alert('DB Error ' + err.message + err.code);
        });
    });
}

// Delete function
function deleteBook(){
    db.transaction(function(tr){
        var name = $('#sBookName3').val();
        console.log(name);
        // Below variable is query statement
        var deleteSQL = 'delete from book where name = ?';
         // Run SQL query
        tr.executeSql(deleteSQL, [name], function(tr, rs){
            console.log('Deleted the book...');
            // Display the result to user
            alert($('#bookName3').val() + ' is deleted.');
            // Reset Book's info in the tuple
            $('#bookType3').val('');
            $('#bookName3').val('');
            $('#sBookName3').val('');
        },
        function(tr, err){
            alert('DB Error' + err.message + err.code);
        }
        );
    });
}

// Data searching transaction
function selectBook2(name){
    db.transaction(function(tr){
        // Below variable is query statement
      var selectSQL = 'select type, name from book where name=?';  
       // Run SQL query      
        tr.executeSql(selectSQL, [name], function(tr, rs){
            // Return Book's genre
            $('#bookType2').val(rs.rows.item(0).type).attr('selected', 'selected'); 	
            $('#bookType2').selectmenu('refresh');	
            // Return Book's title
            $('#bookName2').val(rs.rows.item(0).name);
          });
    });         
 }

function selectBook3(name){
    db.transaction(function(tr){
        // Below variable is query statement
        var selectSQL = 'select * from book where name= ?';
         // Run SQL query
        tr.executeSql(selectSQL, [name], function(tr, rs){
            // Return Book's genre
            $('#bookType3').val(rs.rows.item(0).type).attr('selected', 'selected');
            $('#bookTyep3').selectmenu('refresh');
            // Return Book's title
            $('#bookName3').val(rs.rows.item(0).name);
        },
        function(tr, err){
            alert('DB Error ' + err.message + err.code);
        }
        );
    });
}

function selectBook4(name){
    db.transaction(function(tr){
        // Below variable is query statement
        var selectSQL = 'select * from book where name= ?';
         // Run SQL query
        tr.executeSql(selectSQL, [name], function(tr, rs){
            // Return Book's genre
            $('#bookType4').val(rs.rows.item(0).type).attr('selected', 'selected');
            // Reset Book's genre
            $('#bookTyep4').selectmenu('refresh');
            // Return Book's title
            $('#bookName4').val(rs.rows.item(0).name);
        }, function(){
            alert('DB Error ' + err.message + err.code);
        }
        );
    });
}