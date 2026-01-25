1. What is a database? What are the types of databases?

A database is an organized collection of data that can be efficiently stored, retrieved, and managed.

Types of databases

Relational (SQL)

NoSQL

In-memory

Distributed

Graph

Time-series

2. Difference between SQL and NoSQL databases
SQL	NoSQL
Relational	Non-relational
Fixed schema	Flexible schema
Tables with rows/columns	Documents, key-value, graph, column
ACID compliant	BASE oriented
Vertical scaling	Horizontal scaling
3. When would you choose SQL over NoSQL and vice versa?

Choose SQL when

Data is structured

Strong consistency is required

Complex joins and transactions are needed

Choose NoSQL when

Data is unstructured or semi-structured

High scalability is required

Low latency and flexibility matter more than strict consistency

4. What is ACID in databases?

ACID ensures reliable transactions.

Atomicity – Transaction is all or nothing

Consistency – Database moves from one valid state to another

Isolation – Concurrent transactions don’t affect each other

Durability – Committed data persists even after failures

5. What is BASE in NoSQL databases?

BASE focuses on availability and scalability.

Basically Available – System remains operational

Soft State – Data may change over time

Eventually Consistent – Data becomes consistent eventually

6. What is database normalization? Explain 1NF, 2NF, 3NF.

Normalization reduces data redundancy.

1NF – Atomic values, no repeating groups

2NF – 1NF + no partial dependency

3NF – 2NF + no transitive dependency

7. What is denormalization? When would you denormalize data?

Denormalization intentionally introduces redundancy to improve read performance.

Used when:

Read operations are frequent

Joins are expensive

Performance is more important than storage

8. What are database indexes? How do they improve performance?

Indexes are data structures that speed up data retrieval.

They improve performance by:

Reducing full table scans

Enabling faster lookups using B-trees or hash structures

9. What are the trade-offs of using indexes?

Pros:

Faster read queries

Cons:

Slower write operations

Extra storage usage

Index maintenance overhead

10. What is a primary key? What is a foreign key?

Primary Key – Uniquely identifies a record in a table

Foreign Key – References a primary key in another table to create relationships