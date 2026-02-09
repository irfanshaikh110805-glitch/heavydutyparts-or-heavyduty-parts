
-- Insert sample categories
INSERT OR IGNORE INTO categories (id, name, description, slug) VALUES
(1, 'Excavator Parts', 'Complete range of excavator parts including tracks, buckets, and hydraulics', 'excavator-parts'),
(2, 'Engine Components', 'Engine filters, pistons, gaskets and cooling system parts', 'engine-components'),
(3, 'Hydraulics', 'Hydraulic pumps, cylinders, valves and accessories', 'hydraulics'),
(4, 'Electrical Parts', 'Sensors, switches, wiring harnesses and control modules', 'electrical'),
(5, 'Transmission', 'Gears, clutches, belts and drive systems', 'transmission'),
(6, 'Tools & Hardware', 'Bolts, fasteners, hand tools, seals and lubricants', 'tools');

-- Insert sample products
INSERT OR IGNORE INTO products (id, name, description, sku, price, image_url, category_id, stock_quantity, is_featured, is_bestseller, specifications) VALUES
(1, 'Excavator Track Chain Assembly', 'Heavy-duty track chain assembly for medium excavators. Compatible with CAT 320, Komatsu PC200', 'EXC-TRK-001', 15500.00, 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=400', 1, 12, 1, 1, 'Material: High-grade steel\nCompatibility: CAT 320, Komatsu PC200\nWeight: 45kg\nWarranty: 12 months'),
(2, 'Hydraulic Cylinder Seal Kit', 'Complete seal kit for boom and arm cylinders. Premium quality seals with extended life', 'HYD-SEAL-002', 2800.00, 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400', 3, 25, 1, 0, 'Kit includes: Rod seals, Piston seals, Wiper seals\nMaterial: Polyurethane\nTemperature range: -40°C to +120°C\nCompatible with: Standard hydraulic cylinders'),
(3, 'Engine Air Filter Element', 'High-efficiency air filter for construction equipment engines. Washable and reusable', 'ENG-FLT-003', 1200.00, 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400', 2, 50, 1, 1, 'Filtration efficiency: 99.5%\nMaterial: Synthetic fiber\nDimensions: 350mm x 250mm x 80mm\nCompatible with: Various diesel engines'),
(4, 'Heavy Duty Bucket Teeth', 'Forged steel bucket teeth for excavators. Heat-treated for maximum durability', 'EXC-BTH-004', 850.00, 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400', 1, 35, 0, 1, 'Material: Forged alloy steel\nHardness: 48-52 HRC\nWeight: 3.2kg each\nSet includes: 5 teeth + pins'),
(5, 'Hydraulic Main Pump', 'Variable displacement hydraulic pump for excavators. Rebuilt with OEM specifications', 'HYD-PMP-005', 45000.00, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400', 3, 8, 1, 0, 'Flow rate: 180 L/min\nPressure: 350 bar\nDisplacement: 180cc/rev\nWarranty: 6 months'),
(6, 'Engine Gasket Set Complete', 'Complete engine gasket set for diesel engines. Premium quality gaskets', 'ENG-GSK-006', 3200.00, 'https://images.unsplash.com/photo-1572083669928-e431728b4823?w=400', 2, 20, 0, 0, 'Kit includes: Head gasket, Valve cover gasket, Oil pan gasket\nMaterial: Multi-layer steel\nEngine compatibility: 4-cylinder diesel'),
(7, 'Electrical Wiring Harness', 'Main wiring harness for excavator electrical systems. Plug-and-play installation', 'ELE-WIR-007', 4500.00, 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400', 4, 15, 0, 0, 'Length: 3.5 meters\nConnectors: Waterproof sealed\nVoltage rating: 12V/24V\nCertification: ISO 14001'),
(8, 'Transmission Drive Gear', 'Final drive gear assembly for excavator transmission. Precision machined', 'TRA-GR-008', 8900.00, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 5, 10, 1, 0, 'Gear ratio: 4.5:1\nMaterial: Case-hardened steel\nTorque capacity: 15000 Nm\nLubrication: Pre-filled with gear oil'),
(9, 'Bolt & Fastener Kit', 'Comprehensive bolt and fastener kit for maintenance. Various sizes included', 'TLS-BLT-009', 650.00, 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400', 6, 40, 0, 1, 'Kit contains: 150+ pieces\nSizes: M6 to M20\nMaterial: Grade 8.8 steel\nFinish: Zinc plated'),
(10, 'Cabin Door Handle Assembly', 'Replacement door handle assembly for excavator cabin. Easy installation', 'EXC-CAB-010', 1800.00, 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=400', 1, 18, 0, 0, 'Material: Powder-coated steel\nIncludes: Handle, lock mechanism, keys\nCompatibility: Most excavator models\nColor: Black');
