Database Design Notes
=========================

Unlike SANRU Trakker, our database will not maintain respective tables for `creditors` and `debitors`.
Rather, we assert that the distinction between creditor and debitor is an ~action~ (purchase, loan,
sale, etc...) and not a property of the entity itself.

Thus, we have constructed two entities to manage patient billing, hospital purchases, sales, and all
other miscellaneous expenses: `patient` and `organisation`.  The two entities are described below:

`patient`
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| `id` | `organisation_id` | `first_name` | `last_name` | `dob`      | `parent_name` | `sex` | `religion`  | `marital_status` | `phone`    | `email`                      | `addr_1`             | `addr_2` | `village`  | `zone`     | `city`     | `country` |
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| 1    | 1                 | 'Jonathan'   | 'Niles'     | 07-06-1992 | 'Wayne'       | 'm'   | 'christian' | 'single'         | 0821234432 | 'jonathan.niles@example.com' | '5800 Bay Shore Rd.' | ''       | 'Sarasota' | 'Sarasota' | 'Sarasota' | 'USA'     |
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

`organisation`
--------------------------------------------------------------------------------------------------------------------------
| `id` | `name`        | `account_number` | `location_id` | `address_1` | `address_2` | `payment_id` | `phone` | `email` |
--------------------------------------------------------------------------------------------------------------------------
| 1    | 'AllPatients' | 10001            | 1             | null        | null        | 1            | null    | null    |
--------------------------------------------------------------------------------------------------------------------------

All patients are required to register a subsequent organisation.  Not only does this enforce a desirable
symmetry in the database construction, but it also associates each patient with an account for billing.
Furthermore, the distinction between creditors and debitors is relagated to the patient/organisation pair's
behavoir in the transaction table.

`location`
---------------------------------------------------------------------------------------------
| `id` | `city`     | `zone`     | `region`   | `country`                          | `note` |
---------------------------------------------------------------------------------------------
| 1    | 'Kinshasa' | 'Ngaliema' | 'Kinshasa' | 'Democratic Republic of the Congo' | null   |
---------------------------------------------------------------------------------------------

Location is a helper table for organisations and other entities to encapsulate their locations to reduce data 
redundancy.

`payment`
---------------------------------------------------
| `id` | `days` | `months` | `text`      | `note` |
---------------------------------------------------
| 1    | 0      | 0        | "Immediate" | null   |
| 2    | 14     | 0        | "Two Weeks" | null   |
---------------------------------------------------

Payment is a helper table for organisations and patients who are billed.  Provides the ability to delay payment
notices for a pre-defined period of time.  When a patient is registered with an organisation, the payment id of 
the organisation identifies the duration of the payment period.  Application logic uses this table to notify the 
cashier of outstanding bills and suggests contacts based on the registered telephone number, email, or other
contact information.

`transaction`
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| `enterprise_id` | `fiscal_year_id` | `id` | `invoice_number` | `journal_id` | `account_number` | `debit` | `credit` | `currency` | `organisation_id` | `text`                  | `date`     |
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| 101             | 2013001          | 1    | 23               | 'cashbook'   | 600100           | 300     | 0        | 3          | 1                 | 'Sale #23 of medicines' | 21-04-2013 |
| 101             | 2013001          | 2    | 23               | 'cashbook'   | 570000           | 0       | 300      | 3          | 1                 | 'Sale #23 of medicines' | 21-04-2013 |
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Transaction is the workhorse of the database.  The structure above is a ~temporary~ structure.  Our system
divides transfers up into separate lines of debits and credits for each account involved in the transaction.
For instance, if a patient bill is paid for consulation, surgery, hospitalization, and medicines, the system
debits the patient account the total amount on one line, then creates three new lines which credits surgery,
pharmacy, and consultation, respectively.  Every set of transactions is tied together by an invoice id,
allowing a paper trail to be retained locally for audits and analysis.

The `currency` field indicates the recieved currency.  On reports, the currency will be converted to the 
enterprise's currency using a current exchange rate.  A separate currency table denotes the type of currency.

`currency`
-------------------------------------------------------------------------------------------------
| `id` | `name`                 | `symbol` | `note` | `current_rate` | `last_rate` | `updated`  |
-------------------------------------------------------------------------------------------------
| 1    | 'United States Dollar' | 'USD'    | null   | 990            | 920         | 02-03-2011 |
-------------------------------------------------------------------------------------------------

The currency table combines both currency specification and exchange rate management.  An enterprise must
select one currency to do all its reporting.  Other currencies will be "exchanged" (based on the current
rate) at reporting time to give an accurate assessment of an organisation's finances.

`fiscal_year`
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| `enterprise_id` | `id`    | `number_of_months` | `text`                      | `transaction_start_number` | `transaction_stop_number` | `start_month` | `start_year` | `previous_fiscal_year` | `next_fiscal_year` |
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| 1               | 2013001 | 4                  | "Vanga's first fiscal year" | 0                          | 100000                    | 7             | 2013         | null                   | 2014001            |
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Potential re-design: Storing two references to `prev` and `next` fiscal year's are redundent.  Ideally,
the previous and next fiscal years should be derived using SQL at runtime; however, because this table
may be subjected to heavy viewing and sparse writes, we opt for a design that records the information
directly in the table to circumvent the extra processing.  However, one may reduce the redundency by 
storing on a reference to the previous fiscal year.  A simple query would determine the next. This 
decision is pending the actual creation of a fiscal year management module.


