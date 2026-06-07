// mockData.ts
// Data sets representing climate metrics, simulated nodes, ML models, streaming feeds, tickets, and FAQs.

export interface ClimateMetric {
  year: number;
  tempAnomaly: number;
  co2Level: number;
  deforestationRate: number; // in Million Hectares (Mha)
  extremeEvents: number; // Count of severe storms/floods/droughts
}

export const CLIMATE_DATASET: ClimateMetric[] = [
  { year: 1980, tempAnomaly: 0.26, co2Level: 338.7, deforestationRate: 11.2, extremeEvents: 25 },
  { year: 1985, tempAnomaly: 0.12, co2Level: 346.1, deforestationRate: 12.5, extremeEvents: 28 },
  { year: 1990, tempAnomaly: 0.45, co2Level: 354.4, deforestationRate: 13.8, extremeEvents: 34 },
  { year: 1995, tempAnomaly: 0.46, co2Level: 360.8, deforestationRate: 14.1, extremeEvents: 39 },
  { year: 2000, tempAnomaly: 0.40, co2Level: 369.5, deforestationRate: 15.6, extremeEvents: 45 },
  { year: 2005, tempAnomaly: 0.68, co2Level: 379.8, deforestationRate: 16.2, extremeEvents: 58 },
  { year: 2010, tempAnomaly: 0.72, co2Level: 389.9, deforestationRate: 15.1, extremeEvents: 68 },
  { year: 2015, tempAnomaly: 0.90, co2Level: 400.8, deforestationRate: 17.5, extremeEvents: 85 },
  { year: 2020, tempAnomaly: 1.02, co2Level: 414.2, deforestationRate: 18.2, extremeEvents: 104 },
  { year: 2021, tempAnomaly: 0.85, co2Level: 416.4, deforestationRate: 19.1, extremeEvents: 108 },
  { year: 2022, tempAnomaly: 0.89, co2Level: 418.6, deforestationRate: 18.8, extremeEvents: 115 },
  { year: 2023, tempAnomaly: 1.15, co2Level: 421.1, deforestationRate: 19.5, extremeEvents: 132 },
  { year: 2024, tempAnomaly: 1.22, co2Level: 424.3, deforestationRate: 20.1, extremeEvents: 140 },
  { year: 2025, tempAnomaly: 1.28, co2Level: 427.5, deforestationRate: 20.8, extremeEvents: 148 },
];

export interface NodeMetrics {
  name: string;
  role: 'NameNode' | 'DataNode' | 'SecondaryNameNode' | 'ResourceManager';
  status: 'Online' | 'Offline' | 'Busy';
  cpuUsage: number; // percentage
  ramUsage: number; // percentage
  storageCapacityGB: number;
  storageUsedGB: number;
  activeTasks: number;
}

export const HADOOP_NODES: NodeMetrics[] = [
  { name: 'namenode-01', role: 'NameNode', status: 'Online', cpuUsage: 28, ramUsage: 45, storageCapacityGB: 500, storageUsedGB: 12, activeTasks: 4 },
  { name: 'sec-namenode-01', role: 'SecondaryNameNode', status: 'Online', cpuUsage: 12, ramUsage: 30, storageCapacityGB: 500, storageUsedGB: 12, activeTasks: 0 },
  { name: 'res-mgr-01', role: 'ResourceManager', status: 'Online', cpuUsage: 35, ramUsage: 55, storageCapacityGB: 0, storageUsedGB: 0, activeTasks: 8 },
  { name: 'datanode-01', role: 'DataNode', status: 'Online', cpuUsage: 45, ramUsage: 60, storageCapacityGB: 2000, storageUsedGB: 1420, activeTasks: 3 },
  { name: 'datanode-02', role: 'DataNode', status: 'Online', cpuUsage: 62, ramUsage: 78, storageCapacityGB: 2000, storageUsedGB: 1530, activeTasks: 5 },
  { name: 'datanode-03', role: 'DataNode', status: 'Online', cpuUsage: 38, ramUsage: 50, storageCapacityGB: 2000, storageUsedGB: 1110, activeTasks: 2 },
  { name: 'datanode-04', role: 'DataNode', status: 'Online', cpuUsage: 50, ramUsage: 65, storageCapacityGB: 2000, storageUsedGB: 1390, activeTasks: 4 },
];

export interface MapReduceJob {
  id: string;
  name: string;
  description: string;
  inputDataset: string;
  outputDirectory: string;
  mapperCount: number;
  reducerCount: number;
  logs: string[];
}

export const MAPREDUCE_JOBS: MapReduceJob[] = [
  {
    id: 'MR-001',
    name: 'Climate Anomaly Filter',
    description: 'Processes large-scale sensor logs to extract temperature measurements exceeding historical standard deviations.',
    inputDataset: 'hdfs:///data/climate/sensors/daily_readings_2020_2025.csv',
    outputDirectory: 'hdfs:///analytics/output/extreme_anomalies/',
    mapperCount: 16,
    reducerCount: 4,
    logs: [
      'Job initialized. Submission ID: job_202605211326_001',
      'NameNode mapping 16 input splits across DataNodes.',
      'Map Phase started. Active Mappers: 16',
      'Map phase progress: 25% - Processed 4,231,090 records.',
      'Map phase progress: 50% - Processed 8,462,180 records.',
      'Map phase progress: 75% - Processed 12,693,270 records.',
      'Map phase progress: 100% - Finished mapping operations.',
      'Shuffle & Sort Phase started. Moving partition buffers.',
      'Partitioning output keys using ClimateSensorPartitioner.',
      'Reduce Phase started. Merging intermediate values.',
      'Reduce phase progress: 50%',
      'Reduce phase progress: 100% - Task finished.',
      'Writing analytics file: hdfs:///analytics/output/extreme_anomalies/part-r-00000',
      'Job completed successfully in 42.6 seconds.'
    ]
  },
  {
    id: 'MR-002',
    name: 'CO2 Global Correlation Analyzer',
    description: 'Performs parallel matrix multiplication to determine Pearson correlation coefficients between atmospheric CO2 and local surface heat indexes.',
    inputDataset: 'hdfs:///data/climate/satellites/co2_matrix_global.json',
    outputDirectory: 'hdfs:///analytics/output/co2_heat_correlation/',
    mapperCount: 32,
    reducerCount: 8,
    logs: [
      'Job initialized. Submission ID: job_202605211326_002',
      'Input data splits allocated. Total size: 1.2 TB.',
      'Map Phase started. Parsing 32 HDFS data blocks.',
      'Map phase progress: 30% - Evaluating spatial coordinates.',
      'Map phase progress: 70% - Mapping CO2 columns to heat matrix.',
      'Map phase progress: 100% - Mappers written to local scratch storage.',
      'Shuffle & Sort Phase started. Sorting keys: [Latitude_Longitude_Timestamp]',
      'Reduce Phase started. Executing correlation calculations.',
      'Reduce phase progress: 100%',
      'Combining node outputs to single final matrix.',
      'Job completed. Correlation computed: +0.8732 (Highly positive correlation).',
      'Output written to target directory.'
    ]
  },
  {
    id: 'MR-003',
    name: 'Missing Sensor Data Imputer',
    description: 'Scans weather telemetry for missing intervals and imputes data points using a distributed k-nearest-neighbors spatial averaging algorithm.',
    inputDataset: 'hdfs:///data/climate/weather_stations/telemetry_raw.csv',
    outputDirectory: 'hdfs:///analytics/output/imputed_telemetry/',
    mapperCount: 8,
    reducerCount: 2,
    logs: [
      'Job initialized. Submission ID: job_202605211326_003',
      'Preparing raw logs parsing. Missing data detected: ~4.2%.',
      'Map Phase started. Segmenting stations into geographical zones.',
      'Map phase progress: 50% - Spatial partitioning applied.',
      'Map phase progress: 100% - Zero-value flags generated.',
      'Shuffle & Sort Phase: grouping stations with neighboring data points.',
      'Reduce Phase: Imputing values using geographic grid regression.',
      'Reduce phase progress: 100% - Corrected 312,940 missing fields.',
      'Validation check passed. Storage footprint stabilized.',
      'Job completed. Imputed clean dataset stored in HDFS.'
    ]
  }
];

export interface PredictionDataPoint {
  year: number;
  historical: number | null;
  businessAsUsual: number | null;
  mitigationScenario: number | null;
}

export const ML_FORECAST_DATA: PredictionDataPoint[] = [
  { year: 2010, historical: 0.72, businessAsUsual: null, mitigationScenario: null },
  { year: 2015, historical: 0.90, businessAsUsual: null, mitigationScenario: null },
  { year: 2020, historical: 1.02, businessAsUsual: null, mitigationScenario: null },
  { year: 2025, historical: 1.28, businessAsUsual: 1.28, mitigationScenario: 1.28 },
  { year: 2030, historical: null, businessAsUsual: 1.45, mitigationScenario: 1.32 },
  { year: 2035, historical: null, businessAsUsual: 1.68, mitigationScenario: 1.35 },
  { year: 2040, historical: null, businessAsUsual: 1.95, mitigationScenario: 1.38 },
  { year: 2045, historical: null, businessAsUsual: 2.22, mitigationScenario: 1.40 },
  { year: 2050, historical: null, businessAsUsual: 2.50, mitigationScenario: 1.42 },
];

export interface SupportTicket {
  id: string;
  studentName: string;
  email: string;
  category: 'Bug Report' | 'Technical Inquiry' | 'Feedback' | 'Documentation Help';
  subject: string;
  message: string;
  status: 'Open' | 'Resolved';
  dateSubmitted: string;
  teamResponse?: string;
}

export const DEFAULT_TICKETS: SupportTicket[] = [
  {
    id: 'TCK-402',
    studentName: 'Alex Mercer',
    email: 'a.mercer@aptech-edu.net',
    category: 'Technical Inquiry',
    subject: 'Hadoop Core-Site.xml settings error',
    message: 'I am getting a Connection Refused error when attempting to run the MapReduce job. My fs.defaultFS is pointing to localhost:9000. Is there something else I need to toggle in HDFS?',
    status: 'Resolved',
    dateSubmitted: '2026-05-19',
    teamResponse: 'Hi Alex! Ensure your NameNode service is fully running first. Execute `start-dfs.cmd` in your Hadoop sbin directory and verify that nameNode web UI is live at http://localhost:9870 before submitting the jar.'
  },
  {
    id: 'TCK-409',
    studentName: 'Priya Sharma',
    email: 'priya.sharma23@aptech-edu.net',
    category: 'Bug Report',
    subject: 'MongoDB collection indices not indexing',
    message: 'When using Mongo shell, the index for geospatial satellite coords fails to build on climate data. The command `db.satellite.createIndex({coords: "2dsphere"})` returns bad value.',
    status: 'Open',
    dateSubmitted: '2026-05-20'
  },
  {
    id: 'TCK-410',
    studentName: 'John Doe',
    email: 'johndoe@aptech-edu.net',
    category: 'Feedback',
    subject: 'Love the climate dashboards!',
    message: 'The visual dashboards match our Tableau requirements beautifully. The step by step MapReduce animator really helped clarify how the shuffling works.',
    status: 'Resolved',
    dateSubmitted: '2026-05-21',
    teamResponse: 'Thank you, John! We appreciate your kind words. Make sure to document these MapReduce stages in your final eProject report submission!'
  }
];

export const FAQS = [
  {
    q: 'How does Hadoop guarantee fault tolerance when processing climate datasets?',
    a: 'Hadoop stores data blocks in HDFS with replication (default replica factor is 3). If a DataNode hosting a block fails, the NameNode automatically schedules re-replication from another surviving node to maintain redundancy. MapReduce tasks are also re-run on other active nodes if a task tracker node encounters a hardware error.'
  },
  {
    q: 'What is the role of MongoDB vs. HDFS in the EarthScape Climate Agency architecture?',
    a: 'HDFS acts as the raw/batch data lake, storing massive multi-terabyte files (unstructured satellite matrices, historical station lists) for deep analysis. MongoDB is utilized as a high-speed operational store, housing real-time sensor streams, active client profiles, alert thresholds, support logs, and aggregated metrics for fast dashboard rendering.'
  },
  {
    q: 'How do machine learning algorithms calculate the predictive temperature scenarios?',
    a: 'The predictive studio simulates an LSTM (Long Short-Term Memory) recurrent neural network that evaluates historical year-on-year temperature increments and correlates them with greenhouse gas inputs. The "Sustainable Mitigation" scenario assumes a capping of atmospheric CO2 at 450 ppm by 2040, whereas the "Business-As-Usual" scenario models a continued 2.1 ppm yearly growth.'
  },
  {
    q: 'How can I execute my own custom MapReduce job within this simulated platform?',
    a: 'In the Hadoop Cluster Monitor view, select the custom MapReduce tab. You can input custom mapper/reducer functions in Java code, select the ingestion dataset, configure the nodes, and trigger the compilation. You will see a live trace of the stages as they execute.'
  }
];
