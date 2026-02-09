
-- Insert sample categories
INSERT INTO categories (name, description, slug) VALUES
('Excavator Parts', 'High-quality excavator components and replacement parts', 'excavator-parts'),
('Engine Components', 'Engine parts including filters, pistons, and gaskets', 'engine-components'),
('Hydraulics', 'Hydraulic systems, pumps, cylinders, and valves', 'hydraulics'),
('Electrical Parts', 'Electrical components, sensors, and wiring', 'electrical'),
('Transmission', 'Transmission parts, gears, and drive systems', 'transmission'),
('Tools & Hardware', 'Tools, bolts, seals, and maintenance supplies', 'tools');

-- Insert sample products with detailed descriptions and specifications
INSERT INTO products (name, description, sku, price, image_url, category_id, stock_quantity, is_featured, is_bestseller, specifications) VALUES
('Excavator Track Chain', 'Heavy-duty track chain designed for maximum durability and performance in demanding construction environments. Made from high-grade steel with precision engineering for optimal equipment operation.', 'EXC-TC-001', 15999.99, 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=400', 1, 25, 1, 1, 'Material: High-grade steel
Length: 3.5 meters
Weight: 45 kg
Compatible Models: CAT 320D, 325D, 330D
Pitch: 190mm
Working Life: 2000+ hours
Warranty: 12 months'),

('Hydraulic Pump Assembly', 'Main hydraulic pump assembly providing reliable fluid power for excavator operations. Features advanced sealing technology and precision manufacturing for extended service life.', 'HYD-PA-002', 45000.00, 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400', 3, 8, 1, 0, 'Flow Rate: 280 L/min
Pressure: 350 bar
Weight: 68 kg
Displacement: 280cc
Compatible Models: Komatsu PC200, PC220
Mounting: SAE A flange
Temperature Range: -20°C to +80°C
Warranty: 18 months'),

('Engine Air Filter', 'High-performance air filter ensuring clean air intake for optimal engine performance. Multi-layer filtration technology captures 99.9% of dust and debris particles.', 'ENG-AF-003', 2499.99, 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400', 2, 150, 0, 1, 'Filter Type: Dry element
Efficiency: 99.9%
Dimensions: 350 x 280 x 65mm
Compatible Models: Caterpillar C7, C9
Service Life: 500 hours
Material: Cellulose media
Flow Rate: 850 CFM
Part Number: 1R-0756'),

('Hydraulic Cylinder Seal Kit', 'Complete seal kit for hydraulic cylinders including O-rings, wipers, and backup rings. Premium quality seals ensure leak-free operation and extended cylinder life.', 'HYD-SK-004', 3799.99, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400', 3, 45, 0, 0, 'Cylinder Bore: 100mm
Rod Diameter: 70mm
Material: NBR/PU
Temperature Range: -40°C to +100°C
Pressure Rating: 250 bar
Kit Contents: 15 pieces
Compatible Models: Volvo EC210, EC240
Warranty: 6 months'),

('Electrical Wiring Harness', 'Main electrical wiring harness for excavator control systems. Includes weather-resistant connectors and heavy-duty insulation for reliable electrical connections.', 'ELE-WH-005', 8999.99, 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400', 4, 20, 1, 0, 'Length: 4.2 meters
Wire Gauge: 12-18 AWG
Connectors: 45 weatherproof
Temperature Rating: -40°C to +125°C
Voltage Rating: 24V DC
Compatible Models: JCB JS200, JS220
IP Rating: IP67
Warranty: 24 months'),

('Transmission Gear Set', 'Precision-machined gear set for excavator transmission systems. Heat-treated steel construction ensures durability under heavy load conditions.', 'TRA-GS-006', 28500.00, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 5, 12, 0, 1, 'Material: Alloy steel
Heat Treatment: Carburized
Gear Ratio: 4.2:1
Torque Rating: 2800 Nm
Weight: 35 kg
Compatible Models: Hitachi ZX200, ZX210
Surface Hardness: HRC 58-62
Warranty: 12 months'),

('Bucket Teeth Set', 'Heavy-duty bucket teeth designed for maximum digging performance and wear resistance. Self-sharpening design maintains cutting edge throughout service life.', 'EXC-BT-007', 4999.99, 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400', 1, 80, 1, 1, 'Material: Forged steel
Hardness: HRC 48-52
Set Contents: 5 teeth + pins
Weight: 12 kg per set
Compatible Buckets: 0.8-1.2 m³
Penetration: Superior
Self-sharpening: Yes
Warranty: 6 months'),

('Engine Oil Filter', 'High-efficiency oil filter maintaining engine oil cleanliness and extending engine life. Advanced filtration media removes contaminants down to 25 microns.', 'ENG-OF-008', 1899.99, 'https://images.unsplash.com/photo-1572083669928-e431728b4823?w=400', 2, 200, 0, 0, 'Filter Media: Synthetic blend
Efficiency: 98% @ 25 microns
Flow Rate: 45 L/min
Operating Pressure: 10 bar
Thread: M20 x 1.5
Compatible Engines: Deutz BF4M2012
Service Interval: 250 hours
Bypass Valve: 1.7 bar');
