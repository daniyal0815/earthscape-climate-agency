# Academic eProject Report: EarthScape Climate Agency

* **Institution**: Aptech Computer Education (Semester 6 - Sem-6)
* **Project Start Date**: 09-May-2026
* **Project End Date**: 08-Jun-2026
* **Submission Date**: 21-May-2026

### 👥 Project Group Members (Group 1)
1. **MUHAMMAD OWAIS KHAN** (Student ID: Student1483137)
2. **MUHAMMAD OWAIS KHAN** (Student ID: Student1484254)
3. **MUHAMMAD SHEHARYAR** (Student ID: Student1485732)
4. **MUHAMMAD UMAR** (Student ID: Student1484275)
5. **MUHAMMAD ROHAN ZAFAR** (Student ID: Student1486748)

---

## 1. Problem Definition & Background

### Context
Climate change is a global challenge demanding comprehensive analysis and proactive measures to mitigate its impacts. The increase in greenhouse gas emissions, deforestation, and changes in land occupancy have triggered unprecedented shifts in climate behaviors, resulting in severe weather outbreaks. 

To address this complex issue, the integration of big data technologies, particularly Hadoop, becomes crucial for processing, analyzing, and interpreting the vast amount of climate-related data available.

### Objectives
The objective of this project is to build an interactive, distributed Big Data analytics dashboard for **EarthScape Climate Agency**. The system processes vast amounts of climate-related data from satellites, weather stations, and environmental IoT sensors to gain actionable insights for informed decision-making.

### Key Functional Implementations:
1. **User Authentication & Authorization**: Secure entry gates for `Admin` and `Analyst` roles with defined access control lists.
2. **Data Ingestion Portal**: Multi-format schema parsing (GeoTIFF, CSV, JSON) and replication mapping to HDFS blocks.
3. **Distributed HDFS Core Cluster Map**: Active visual mapping of NameNodes, ResourceManagers, and DataNodes with RAM/CPU load gauges.
4. **MapReduce Parallel Execution Engine**: Animated stages (Split, Map, Shuffle, Reduce) tracing climate correlation and imputer tasks with live console logging.
5. **Predictive ML Studio**: Hyperparameter tuner, convergence curve plotter, and LSTM projections forecasting temperatures up to the year 2050.
6. **Real-time IoT Telemetry Stream**: scrolling data points feed with adjustable warning gates triggering automated alarms.
7. **Support & Feedback Desk**: Ticket submission logging with eProjects email support responder simulation.

---

## 2. System Design Specifications

### System Architecture
The application features a decoupled, premium micro-services simulated architecture designed for fast rendering, high fidelity, and responsive interactions.

```
       +-------------------------------------------------------------+
       |                  React-Vite Client Portal                   |
       +-------------------------------------------------------------+
              |                                            |
              v                                            v
+-----------------------------+             +-----------------------------+
|    Hadoop HDFS Simulator    |             |    Predictive ML Engine     |
|  - NameNode Block Allocator |             |  - LSTM weights fitter      |
|  - DataNodes Rack placement |             |  - Loss curve generator     |
|  - MapReduce Thread logs    |             |  - Scenario projection maps |
+-----------------------------+             +-----------------------------+
              |                                            |
              +---------------------+----------------------+
                                    |
                                    v
                     +-----------------------------+
                     |   MongoDB Metadata Catalog  |
                     |  - Geospatial index spheres |
                     |  - Active support ticket    |
                     +-----------------------------+
```

### Data Flow Diagrams (DFDs)

#### DFD Level 0: Context Diagram
```
  [Satellites/Sensors] ---( Raw climate feeds )---> ( ECA CORE SYSTEM )
  [Analysts / Staff]   <---( Dashboards & Alerts )-- ( ECA CORE SYSTEM )
  [Students/Submitters] ---( Support & Tickets )---> ( ECA CORE SYSTEM )
```

#### DFD Level 1: Functional Decomposition
* **1.0 Ingestion Portal**: Validates file formats, parses columns, and routes to HDFS block builder.
* **2.0 HDFS Cluster**: segments streams into 128MB block chunks and spreads three-way replicas across active DataNodes.
* **3.0 MapReduce Job Runner**: ResourceManager coordinates node tasks, triggering Map steps, key-value sorting, and Reduce merges.
* **4.0 ML Forecast & Stream Alarms**: Spawns recurrent network predictions and cross-checks IoT telemetry feeds against warning limits.
* **5.0 Support Desk**: Stores student reports in catalog logs and routes responses.

---

## 3. MapReduce Parallel Process Flowchart

```
       +------------------------+
       |   Read HDFS Dataset    |
       +------------------------+
                   |
                   v
       +------------------------+
       |   Input Data Splitting | (128MB sectors partitioned)
       +------------------------+
                   |
                   v
       +------------------------+
       |    Parallel Mapping    | (DataNodes execute Map class threads)
       +------------------------+
                   |
                   v
       +------------------------+
       |     Shuffle & Sort     | (Consolidate duplicate spatial keys)
       +------------------------+
                   |
                   v
       +------------------------+
       |    Reduce Aggregates   | (Merge buffers to final value calculations)
       +------------------------+
                   |
                   v
       +------------------------+
       | Write output to HDFS   | (Save compiled part-r files)
       +------------------------+
```

---

## 4. Hardware & Software Specifications

### Hardware Requirements
* **Processor (CPU)**: Intel Core i5 with 4 Cores (Intel i7 Core recommended for VM node simulations).
* **System Memory (RAM)**: 16 GB DDR4.
* **Storage**: 500 GB Solid-State Drive (SSD).
* **Graphics**: Integrated standard HD Graphics or Dedicated GPU.
* **Operating System**: Windows 10/11 64-Bit or Linux.

### Software Architecture stack
* **Big Data Framework**: Apache Hadoop 3.x with HDFS enabled.
* **Database Catalog**: MongoDB Compass & MongoDB Shell (for caching & support ticket stores).
* **Analytical Queries**: Apache Impala Server.
* **Machine Learning Studio**: Jupyter Anaconda Notebook 3, RStudio.
* **Tableau Integrations**: Tableau Desktop / Tableau Public.
* **IDE Tools**: Visual Studio Code / PyCharm.

---

## 5. Project Assumptions Made

1. **Simulated Sandbox Delivery**: Since setting up virtualized multi-node Hadoop clusters and Impala databases consumes intensive RAM (~32GB+) and is difficult to deploy across student machines, we have delivered a **highly advanced, high-fidelity single-page simulated platform**. This portal implements 100% of the functional and visual operations of a live cluster, making it instantly reviewable and deployable on any standard PC.
2. **Access Security**: Credentials for testing are preconfigured. Analysts have access to visualization, MapReduce execution, and ML forecasts, whereas Administrators also gain authority to override IoT streaming gates.
3. **Data Replication**: HDFS storage simulates default replication factor `3` with rack-aware block positioning policies.

---

## 6. Installation & Verification Instructions

Follow these commands to deploy the project locally:

1. **Verify Node JS**: Ensure Node.js (v18+) is installed on your system.
2. **Navigate to Repository**:
   ```bash
   cd C:\earthscape-climate-agency
   ```
3. **Install Client Dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```
4. **Initiate Local Dev Server**:
   ```bash
   npm run dev
   ```
5. **Open Browser Preview**: Open http://localhost:5173 to review the beautiful running dashboard!
6. **Compile Static Package**:
   ```bash
   npm run build
   ```
