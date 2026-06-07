// capture.cjs
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  console.log('Launching headless browser via local Chrome...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1440, height: 900 }
  });

  const page = await browser.newPage();
  
  // Set up screenshots folder
  const screenshotDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir);
  }

  console.log('Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await wait(3000); // Wait for load and blurs
  await page.screenshot({ path: path.join(screenshotDir, '01_landing_page.png') });
  console.log('Captured: 01_landing_page.png');

  // Go to login page
  console.log('Navigating to Secure Login...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent.includes('Launch'));
    if (btn) btn.click();
  });
  await wait(2000);
  await page.screenshot({ path: path.join(screenshotDir, '02_login_page.png') });
  console.log('Captured: 02_login_page.png');

  // Select James (Analyst) quick-fill credentials
  console.log('Filling Analyst login credentials...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent.includes('James'));
    if (btn) btn.click();
  });
  await wait(1000);

  // Authenticate login
  console.log('Submitting login form...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent.includes('Authenticate'));
    if (btn) btn.click();
  });
  await wait(3000);
  await page.screenshot({ path: path.join(screenshotDir, '03_dashboard_view.png') });
  console.log('Captured: 03_dashboard_view.png');

  // Capture HDFS Cluster
  console.log('Navigating to HDFS Cluster View...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('aside nav button'));
    const btn = buttons.find(b => b.textContent.includes('Hadoop HDFS'));
    if (btn) btn.click();
  });
  await wait(2000);
  // Trigger MapReduce thread animation
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Initiate MapReduce'));
    if (btn) btn.click();
  });
  await wait(4000);
  await page.screenshot({ path: path.join(screenshotDir, '04_hadoop_hdfs_view.png') });
  console.log('Captured: 04_hadoop_hdfs_view.png');

  // Capture ML Studio
  console.log('Navigating to Predictive ML Studio...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('aside nav button'));
    const btn = buttons.find(b => b.textContent.includes('Predictive ML'));
    if (btn) btn.click();
  });
  await wait(2000);
  // Trigger model training for live curve plotting
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Initiate Model Training'));
    if (btn) btn.click();
  });
  await wait(5000); // wait for training curve convergence
  await page.screenshot({ path: path.join(screenshotDir, '05_predictive_ml_studio.png') });
  console.log('Captured: 05_predictive_ml_studio.png');

  // Capture Ingestion Portal
  console.log('Navigating to Ingestion Portal...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('aside nav button'));
    const btn = buttons.find(b => b.textContent.includes('Ingestion Portal'));
    if (btn) btn.click();
  });
  await wait(2000);
  // Trigger Weather CSV preset to run stepper
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Weather CSV'));
    if (btn) btn.click();
  });
  await wait(4000); // wait for pipeline steps
  await page.screenshot({ path: path.join(screenshotDir, '06_ingestion_portal.png') });
  console.log('Captured: 06_ingestion_portal.png');

  // Capture IoT Stream
  console.log('Navigating to IoT Sensor Stream...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('aside nav button'));
    const btn = buttons.find(b => b.textContent.includes('IoT Sensor'));
    if (btn) btn.click();
  });
  await wait(3000); // Let some ticks render
  await page.screenshot({ path: path.join(screenshotDir, '07_iot_sensor_stream.png') });
  console.log('Captured: 07_iot_sensor_stream.png');

  // Capture Support & FAQ
  console.log('Navigating to Support & FAQ...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('aside nav button'));
    const btn = buttons.find(b => b.textContent.includes('Support & FAQ'));
    if (btn) btn.click();
  });
  await wait(2000);
  await page.screenshot({ path: path.join(screenshotDir, '08_support_and_faq.png') });
  console.log('Captured: 08_support_and_faq.png');

  // Capture Documentation Hub
  console.log('Navigating to Documentation Hub...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('aside nav button'));
    const btn = buttons.find(b => b.textContent.includes('Documentation Hub'));
    if (btn) btn.click();
  });
  await wait(2000);
  await page.screenshot({ path: path.join(screenshotDir, '09_documentation_hub.png') });
  console.log('Captured: 09_documentation_hub.png');

  await browser.close();
  console.log('All screenshots captured successfully!');
})();
