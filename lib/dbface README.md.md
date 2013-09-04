DBFACE DOCUMENTATION
====================
---

##TODOs##

This module's role is to interact with the data bases. Here we find three main functionalities.
##Contents##

1. *The pretreatment (Sanitize)*
2. *Error Handling*
3. *A generic interface for all database activities.*

### The pretreatment (Sanitize) ###

This function is responsible for removing spaces in a string of characters, solves the problems associated accents and quotes.



### Error Handling ###


### A generic interface for all database activities ###

Here we have three basic functions:

- Select 
- insert
- update
- Delete

****Select :***
This method plays the role of interfacing between web server and our management module data bases regarding the selection of data So it is visible from the outside.

    exports.selectionner = function(data,cb) {
      //code
    }

`data` encapsulates the information necessary for the selection as json Format; exemple:

    {entities:[{t:'account',c:['id']}, {t:'transaction',c:['id', 'accountID']}],
     jcond:[{ts:['account', 'transaction'], c:['id', 'accountID'], l:'AND'}],
    cond:[{t:'account', cl:'id', z:'>', v:'2000', l:'OR'},
          {t:'account', cl:'id', z:'<', v:'100'}]}
where *entities* specifies what we need to select from our database and *jcond* the join condition when more tables, and the same *cond* specifies a simple condition, it means a condition concerning only one table. 
`cb` is the callback function specified below:

	function(err, ans) {
	 //Error handler
	}

the function will build the statement below:

	SELECT account.id,transaction.id,transaction.accountID FROM account,transaction
	WHERE account.id = transaction.accountID AND account.id > '2000' OR account.id <
 	'100';

###### Required fields:
* entities: `[{t:'alias',c:['col1, col2,...,coln']}[,...]]`
* jcond: `[{ts:[table1,...,tableN], c:[idcol1,...,idcolN], l:combination}]`
* cond: `[{t:alias, cl:alias, z:alias, v: alias, [l:alias]}[,...]]`

###### Possible fields:
* ts: specifies tables concerned by the join condition. `eg: jcond:[{ts:['account', 'transaction'],`
* cl: specifies columns concerned by the join condition. `eg: cond:[{t:'account', cl:'id', z:'>', v:'2000',`
* v: value of condition `eg: cond:[{t:'account', cl:'id', z:'>', v:'2000', l:'OR'}`
* c : columns concerned by the join condition `eg: jcond:[{ts:['account', 'transaction'], c:['id', 'accountID'], l:'AND'}]`
* t: table `eg: {entities:[{t:'account',c:['id']}`
* jcond : join conditions
* cond: simple condition (in one table)
    * l: specifies the Combinations:
        * AND condition `eg: jcond:[{ts:['account', 'transaction'], c:['id', 'accountID'], l:'AND'}]`
        * OR condition  `eg: cond:[{t:'account', cl:'id', z:'>', v:'2000', l:'OR'}`
    * Conditions
        * `<` specifies LESS THAN 
        * `>` specifies GREATER THAN 

****insert :***  
This method plays the role of interfacing between web server and our management module data bases as regards the insertion of the data So it is visible from the outside.

    exports.inserer = function(table, rows, cb) {
      //code
    }
with `table` a string specifying the table receiving data (*eg: 'personne'*), `cb` the callback function and `rows` a json containing data to insert. this is an example of our json format:

	[{id:7, nom:'nom1', prenom:'prenom1', adresse:'adresse1', date:'2013-05-16', etat:"li'bre"},
     {id:8, nom:'nom2', prenom:'prenom2', adresse:'adresse2', date:'2013-05-16', etat:"libre"}];

the function builds from the json above, the Mysql statement below:

	'INSERT INTO personne (id,nom,prenom,adresse,date,etat) VALUES (\'7\',\'nom1\',\'prenom1\',\'adresse1\',\'2013-05-16\',\'li\'bre\'),(\'8\',\'nom2\',\'prenom2\',\'adresse2\',\'2013-05-16\',\'libre\');';


****update***

This method plays the role of interfacing between web server and our management module data bases regarding the change of data. So it is visible from the outside.

	exports.modifier = function(table, data, cb) {
	  //code
	}

With `table` a string specifying the table concerned by the update operation, `cb` the callback function and `data` the data to update in json format like:

	{rows:{id:1}
	 updateInfo: {property: value}}

`eg:`

	 e.modifier('account', {rows:{id:'1010'}, updateInfo:{accountLocked:'0'}},f);

the function will build the statement below:

	UPDATE account SET accountLocked='0' WHERE id='1010';

###### Required fields:
* rows: specifies the to be updated`rows:{id:'1010'}`
* updateInfo: specifies the new information that will replace the old one in the database `updateInfo:{accountLocked:'0'}`
`
****delete***

This method plays the role of interfacing between web server and our management module data bases regarding the deletion of data So it is visible from the outside.

    exports.deleter = function(table, ids, next) {
	  //code
	}

With `table` a string specifying the table concerned by the update operation and `ids` the identifiers of rows concerned; it json's format is:

	{'id': [1,2,3],
	'name': ['jon', 'gered'],
	'ColumnName: [list of possible values]};


`eg: dbFace.deleter('user', {id:[1,2,3]}, f);` 

the function will build thw statement below:

	DELETE FROM user WHERE id IN (1,2,3);

###### Required fields:
* columnNane: specifies the columns concerned`eg: id, name`
* list of possible values: specifies the value just to restrict the operation `eg: [1,2,3] ` and `['jon', 'gered']`.
