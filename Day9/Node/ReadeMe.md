1. What is database scaling? Explain vertical vs horizontal scaling.

Database scaling is increasing a database’s capacity to handle more load.

Vertical Scaling (Scale Up):

Increase CPU, RAM, storage on a single server

Simple to implement

Limited by hardware limits

Horizontal Scaling (Scale Out):

Add more database servers

Better fault tolerance & scalability

More complex (requires sharding/replication)

2. What is database replication? Explain master-slave replication.

Replication copies data from one database to others for availability and read scalability.

Master (Primary): Handles writes

Slave (Replica): Handles reads

Data is synced asynchronously/synchronously

Improves read performance & fault tolerance

3. What is database sharding? How does it work?

Sharding splits data across multiple databases (shards).

Each shard stores a subset of data

Data is distributed using a shard key (e.g., userId)

Example: users 1–1M → shard A, 1M–2M → shard B

4. What are the challenges of sharding?

Complex queries across shards

Rebalancing data when shards grow

Cross-shard joins are expensive

Increased operational complexity

5. What is database partitioning? How does it differ from sharding?

Partitioning: Splitting tables within the same database

Sharding: Splitting data across different databases

Partitioning improves performance

Sharding improves scalability

6. What is a connection pool? Why is it important?

A connection pool maintains reusable DB connections.

Reduces connection creation overhead

Improves performance

Prevents DB overload

7. What are N+1 queries? How do you solve this problem?

Occurs when:

1 query fetches data

N additional queries fetch related data

Solutions:

Use JOINs

Batch queries

Eager loading

Use caching

8. What is caching? Explain caching strategies.

Caching stores frequently accessed data in memory.

Cache-aside: App checks cache → DB → update cache

Write-through: Write to cache + DB together

Write-back: Write to cache, DB updated later

9. What is the CAP theorem?

A distributed system can guarantee only two of three:

Consistency

Availability

Partition tolerance

10. What are database transactions? What is MVCC?

Transaction: A sequence of operations executed as a unit (ACID)

MVCC: Allows multiple versions of data for concurrent reads/writes without locking

🧠 Machine Coding Question
Simple Query Optimizer + Cache
📁 Project Structure
project/
│── README.md
│── server.js

