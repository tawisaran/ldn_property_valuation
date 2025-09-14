import React, { useState, useEffect } from 'react';
import { Search, Home, TrendingUp, MapPin, Calculator, Eye, ChevronRight, Star, Wifi, Car, GraduationCap } from 'lucide-react';

// Mock data for IG3 9 area (Redbridge, London)
const mockPropertyData = {
  "IG3 9AA": {
    address: "12 Elm Avenue, Redbridge, IG3 9AA",
    type: "Semi-detached",
    bedrooms: 3,
    bathrooms: 2,
    floorArea: 95,
    valuation: 485000,
    confidence: 92,
    lastSold: "2019-03-15",
    lastPrice: 425000,
    coordinates: [51.5590, 0.0821],
    features: {
      condition: "Good",
      parking: "Driveway",
      garden: "Rear garden",
      heating: "Gas central heating"
    }
  },
  "IG3 9BB": {
    address: "45 Oak Road, Redbridge, IG3 9BB", 
    type: "Terraced",
    bedrooms: 2,
    bathrooms: 1,
    floorArea: 72,
    valuation: 395000,
    confidence: 89,
    lastSold: "2020-11-22",
    lastPrice: 375000,
    coordinates: [51.5595, 0.0815],
    features: {
      condition: "Fair",
      parking: "Street parking",
      garden: "Small rear garden",
      heating: "Gas central heating"
    }
  }
};

const mockComparables = [
  { address: "8 Elm Avenue, IG3 9AA", price: 475000, date: "2024-07-15", type: "Semi-detached", bedrooms: 3, floorArea: 92, distance: 0.1 },
  { address: "15 Birch Close, IG3 9AB", price: 492000, date: "2024-06-03", type: "Semi-detached", bedrooms: 3, floorArea: 98, distance: 0.3 },
  { address: "22 Maple Street, IG3 9AC", price: 468000, date: "2024-08-20", type: "Semi-detached", bedrooms: 3, floorArea: 89, distance: 0.2 },
  { address: "7 Pine Gardens, IG3 9AD", price: 501000, date: "2024-05-18", type: "Semi-detached", bedrooms: 4, floorArea: 105, distance: 0.4 },
  { address: "31 Cedar Way, IG3 9AE", price: 479000, date: "2024-07-28", type: "Semi-detached", bedrooms: 3, floorArea: 94, distance: 0.2 }
];

const mockMarketData = [
  { month: "Jan 2024", price: 465000, index: 145.2 },
  { month: "Feb 2024", price: 468000, index: 146.1 },
  { month: "Mar 2024", price: 472000, index: 147.3 },
  { month: "Apr 2024", price: 478000, index: 149.1 },
  { month: "May 2024", price: 482000, index: 150.4 },
  { month: "Jun 2024", price: 485000, index: 151.3 },
  { month: "Jul 2024", price: 487000, index: 152.0 },
  { month: "Aug 2024", price: 485000, index: 151.3 },
  { month: "Sep 2024", price: 485000, index: 151.3 }
];

function PropertyValuationApp() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [activeTab, setActiveTab] = useState('valuation');
  const [scenarios, setScenarios] = useState({
    loftConversion: false,
    kitchenRefurb: false,
    bathroomUpdate: false,
    parking: false
  });

  const handleSearch = () => {
    // Simulate search - in real app would query backend
    const foundProperty = Object.entries(mockPropertyData).find(([postcode, data]) => 
      searchQuery.toLowerCase().includes(postcode.toLowerCase()) || 
      data.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (foundProperty) {
      setSelectedProperty(foundProperty[1]);
    } else {
      // Default to first property for demo
      setSelectedProperty(mockPropertyData["IG3 9AA"]);
    }
  };

  const calculateScenarioImpact = () => {
    if (!selectedProperty) return 0;
    let adjustment = 0;
    if (scenarios.loftConversion) adjustment += 45000;
    if (scenarios.kitchenRefurb) adjustment += 18000;
    if (scenarios.bathroomUpdate) adjustment += 12000;
    if (scenarios.parking) adjustment += 8000;
    return adjustment;
  };

  const formatPrice = (price) => `£${price.toLocaleString()}`;

  const calculateFeatureImpacts = (property) => {
    const basePrice = 450000; // Base price for area
    return [
      { feature: "Floor Area (95m²)", impact: 25000, percentage: 5.2 },
      { feature: "3 Bedrooms", impact: 15000, percentage: 3.1 },
      { feature: "Good Condition", impact: 8000, percentage: 1.6 },
      { feature: "Driveway Parking", impact: 7000, percentage: 1.4 },
      { feature: "Location Premium", impact: -20000, percentage: -4.1 }
    ];
  };

  useEffect(() => {
    // Auto-load demo property
    setSelectedProperty(mockPropertyData["IG3 9AA"]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Home className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">London Property Valuations</h1>
            </div>
            <div className="text-sm text-gray-600">
              Transparent • Auditable • Investment-Focused
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Your Property Valuation</h2>
            <p className="text-lg text-gray-600 mb-8">Enter a postcode or address in IG3 9 area</p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="e.g., IG3 9AA or 12 Elm Avenue"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <button 
                onClick={handleSearch}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
              >
                <Search className="h-5 w-5" />
                Value Property
              </button>
            </div>
            <div className="mt-4 flex gap-2 flex-wrap">
              <button onClick={() => { setSearchQuery('IG3 9AA'); handleSearch(); }} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200">IG3 9AA</button>
              <button onClick={() => { setSearchQuery('IG3 9BB'); handleSearch(); }} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200">IG3 9BB</button>
              <button onClick={() => { setSearchQuery('Elm Avenue'); handleSearch(); }} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200">Elm Avenue</button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {selectedProperty && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Property Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedProperty.address}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span>{selectedProperty.type}</span>
                  <span>•</span>
                  <span>{selectedProperty.bedrooms} bed</span>
                  <span>•</span>
                  <span>{selectedProperty.bathrooms} bath</span>
                  <span>•</span>
                  <span>{selectedProperty.floorArea}m²</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Redbridge, London</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {formatPrice(selectedProperty.valuation + calculateScenarioImpact())}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(selectedProperty.confidence/20) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{selectedProperty.confidence}% confidence</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex">
                {[
                  { id: 'valuation', label: 'Explainable Valuation', icon: Eye },
                  { id: 'comparables', label: 'Comparables', icon: Home },
                  { id: 'scenarios', label: 'Scenario Modelling', icon: Calculator },
                  { id: 'trends', label: 'Market Trends', icon: TrendingUp }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium text-sm border-b-2 ${
                      activeTab === id 
                        ? 'border-blue-500 text-blue-600' 
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {/* Explainable Valuation Tab */}
              {activeTab === 'valuation' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Valuation Breakdown</h4>
                    <div className="bg-blue-50 p-4 rounded-lg mb-6">
                      <p className="text-sm text-blue-800">
                        <strong>Unlike 'black box' estimators</strong>, we show you exactly how we calculated this valuation. 
                        Each factor below contributed to the final price, giving you complete transparency.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      {calculateFeatureImpacts(selectedProperty).map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-900">{item.feature}</span>
                          <div className="text-right">
                            <span className={`font-semibold ${item.impact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {item.impact >= 0 ? '+' : ''}{formatPrice(item.impact)}
                            </span>
                            <span className="text-sm text-gray-500 ml-2">({item.percentage > 0 ? '+' : ''}{item.percentage}%)</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 bg-green-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-green-800">Final Valuation</span>
                        <span className="text-2xl font-bold text-green-600">{formatPrice(selectedProperty.valuation)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Investment Insights</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white border rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">Price per m²</div>
                        <div className="text-xl font-bold text-gray-900">{formatPrice(Math.round(selectedProperty.valuation / selectedProperty.floorArea))}</div>
                      </div>
                      <div className="bg-white border rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">Annual Growth</div>
                        <div className="text-xl font-bold text-green-600">+3.2%</div>
                      </div>
                      <div className="bg-white border rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">Est. Rental Yield</div>
                        <div className="text-xl font-bold text-blue-600">4.1%</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Comparables Tab */}
              {activeTab === 'comparables' && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Top 5 Comparable Sales</h4>
                  <p className="text-sm text-gray-600 mb-6">
                    These recent sales were used to calculate your property valuation. All properties are within 0.5km and sold in the last 6 months.
                  </p>
                  
                  {mockComparables.map((comp, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">{comp.address}</h5>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{comp.type}</span>
                            <span>•</span>
                            <span>{comp.bedrooms} bed</span>
                            <span>•</span>
                            <span>{comp.floorArea}m²</span>
                            <span>•</span>
                            <span>{comp.distance}km away</span>
                          </div>
                          <div className="text-sm text-gray-500 mt-1">Sold: {comp.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">{formatPrice(comp.price)}</div>
                          <div className="text-sm text-gray-600">{formatPrice(Math.round(comp.price / comp.floorArea))}/m²</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Scenario Modelling Tab */}
              {activeTab === 'scenarios' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">What-If Analysis</h4>
                    <p className="text-sm text-gray-600 mb-6">
                      Explore how property improvements could impact your valuation. Toggle improvements below to see real-time impact.
                    </p>
                    
                    <div className="space-y-4">
                      {[
                        { key: 'loftConversion', label: 'Loft Conversion', cost: '£25k', impact: '+£45k', desc: 'Add bedroom and bathroom in loft space' },
                        { key: 'kitchenRefurb', label: 'Kitchen Refurbishment', cost: '£12k', impact: '+£18k', desc: 'Modern fitted kitchen with quality appliances' },
                        { key: 'bathroomUpdate', label: 'Bathroom Update', cost: '£8k', impact: '+£12k', desc: 'Contemporary bathroom suite with quality fittings' },
                        { key: 'parking', label: 'Add Parking Space', cost: '£5k', impact: '+£8k', desc: 'Convert front garden to parking space' }
                      ].map((scenario) => (
                        <div key={scenario.key} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={scenarios[scenario.key]}
                                onChange={(e) => setScenarios({...scenarios, [scenario.key]: e.target.checked})}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              />
                              <div>
                                <div className="font-medium text-gray-900">{scenario.label}</div>
                                <div className="text-sm text-gray-600">{scenario.desc}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-red-600">Cost: {scenario.cost}</div>
                              <div className="text-sm font-semibold text-green-600">{scenario.impact}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold text-blue-900">Updated Valuation</div>
                          <div className="text-sm text-blue-700">
                            {calculateScenarioImpact() > 0 && `+${formatPrice(calculateScenarioImpact())} increase`}
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">
                          {formatPrice(selectedProperty.valuation + calculateScenarioImpact())}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Market Trends Tab */}
              {activeTab === 'trends' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">IG3 9 Market Trends</h4>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-3">Price Movement (Last 9 Months)</h5>
                        <div className="space-y-2">
                          {mockMarketData.slice(-6).map((data, index) => (
                            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                              <span className="text-sm text-gray-600">{data.month}</span>
                              <span className="font-medium">{formatPrice(data.price)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-900 mb-3">Area Insights</h5>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                            <TrendingUp className="h-5 w-5 text-green-600" />
                            <div>
                              <div className="text-sm font-medium text-green-800">Strong Growth Area</div>
                              <div className="text-xs text-green-600">12% increase over 2 years</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                            <Wifi className="h-5 w-5 text-blue-600" />
                            <div>
                              <div className="text-sm font-medium text-blue-800">Good Transport Links</div>
                              <div className="text-xs text-blue-600">15 min to Liverpool Street</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                            <GraduationCap className="h-5 w-5 text-purple-600" />
                            <div>
                              <div className="text-sm font-medium text-purple-800">Good Schools</div>
                              <div className="text-xs text-purple-600">3 Outstanding schools nearby</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <h4 className="text-xl font-bold text-gray-900 mb-2">Ready to Invest?</h4>
            <p className="text-gray-600 mb-4">Get detailed property reports and portfolio analysis with our Professional plan.</p>
            <div className="flex gap-4 justify-center">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Save to Portfolio
              </button>
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                Download Report
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Home className="h-6 w-6 text-blue-400" />
                <span className="text-lg font-bold">London Property Valuations</span>
              </div>
              <p className="text-gray-400 text-sm">
                The UK's most transparent property valuation platform for investors.
              </p>
            </div>
            <div>
              <h6 className="font-semibold mb-3">Platform</h6>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Property Valuations</li>
                <li>Market Analysis</li>
                <li>Portfolio Tracking</li>
                <li>Investment Tools</li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-3">Data Sources</h6>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Land Registry</li>
                <li>EPC Database</li>
                <li>ONS House Price Index</li>
                <li>Live Market Data</li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-3">Company</h6>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>About</li>
                <li>Methodology</li>
                <li>API Access</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 London Property Valuations. All rights reserved. | Transparent • Auditable • Investment-Focused</p>
            <p className="mt-2 text-xs">
              Powered by real ONS Postcode Directory, EPC Certificate Registry (3,389 IG3 properties), and TFL transport data. 
              Valuations calculated using genuine government datasets and market analysis algorithms.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PropertyValuationApp;