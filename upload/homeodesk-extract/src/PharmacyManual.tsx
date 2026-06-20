import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Book, Droplets, FlaskConical, Scale, Zap, Info, ShieldAlert, List, TableProperties } from 'lucide-react';

export const PharmacyManual = () => {
  const [activeSection, setActiveSection] = useState<string | null>('sec1');

  const toggle = (sec: string) => setActiveSection(activeSection === sec ? null : sec);

  return (
    <div className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mt-6">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Book className="text-blue-600" />
          Complete Homoeopathic Pharmacy Manual
        </h2>
        <p className="text-sm text-slate-500 mt-2">Comprehensive guide from fundamental principles to step-by-step preparation.</p>
      </div>

      <div className="space-y-4">
        {/* Section 1 */}
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <button onClick={() => toggle('sec1')} className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left font-bold text-slate-800">
            <span className="flex items-center gap-2"><Info className="text-blue-500" size={18} /> Section 1: Pharmacy, Pharmacology & Drug Sources</span>
            {activeSection === 'sec1' ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
          {activeSection === 'sec1' && (
            <div className="p-4 text-sm text-slate-700 space-y-4">
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Pharmacy & Pharmacology</h4>
                <p><strong>Pharmacy:</strong> The art and science of collecting, combining, compounding, preparing, preserving, and standardising drugs from natural/synthetic sources.</p>
                <p><strong>Pharmacology:</strong> Science of drugs. Branches into <em>Pharmacognosy</em> (knowledge of crude drugs) and <em>Pharmacodynamics</em> (dynamic action of drugs on living organisms).</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Drug Sources</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Plant Kingdom:</strong> Largest source. Whole plants (Aconite, Pulsatilla), Roots (Bryonia), Leaves (Digitalis), Flowers (Calendula), Seeds (Nux Vomica), Bark (Cinchona).</li>
                  <li><strong>Animal Kingdom:</strong> Whole live animals (Apis Mel), venoms (Lachesis, Naja), secretions (Sepia, Moschus), milk products (Lac Caninum).</li>
                  <li><strong>Mineral Kingdom:</strong> Metals (Aurum Met), Non-metals (Sulphur), Salts (Natrum Mur), Acids (Nitric Acid).</li>
                  <li><strong>Nosodes:</strong> Prepared from diseased tissues/secretions (Psorinum, Tuberculinum, Syphilinum).</li>
                  <li><strong>Sarcodes:</strong> Prepared from healthy endocrine/ductless gland secretions (Adrenalinum, Thyroidinum).</li>
                  <li><strong>Imponderabilia:</strong> Immaterial power/energy (X-Ray, Magnetis Poli, Sol).</li>
                  <li><strong>Synthetic:</strong> Chemically synthesised (Aspirin, Penicillin).</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Collection Rules</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="p-2 text-left">Plant Part</th>
                        <th className="p-2 text-left">Collection Time/Condition</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr><td className="p-2 font-medium">Whole Plant</td><td className="p-2">Flowering season, partly in flower/bud.</td></tr>
                      <tr><td className="p-2 font-medium">Roots</td><td className="p-2">Annuals (early autumn), Biennials (spring 2nd yr), Perennials (before becoming woody).</td></tr>
                      <tr><td className="p-2 font-medium">Leaves</td><td className="p-2">Fully developed, before/during flowering.</td></tr>
                      <tr><td className="p-2 font-medium">Flowers</td><td className="p-2">Dry weather, partly in bud/blossom.</td></tr>
                      <tr><td className="p-2 font-medium">Seeds/Fruits</td><td className="p-2">Fully ripe (unless specified).</td></tr>
                      <tr><td className="p-2 font-medium">Barks</td><td className="p-2">From mature vigorous trees. Resinous (spring), Non-resinous (late autumn).</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 2 */}
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <button onClick={() => toggle('sec2')} className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left font-bold text-slate-800">
            <span className="flex items-center gap-2"><Droplets className="text-teal-500" size={18} /> Section 2: Vehicles & Oils</span>
            {activeSection === 'sec2' ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
          {activeSection === 'sec2' && (
            <div className="p-4 text-sm text-slate-700 space-y-4">
              <p>Vehicles are therapeutically inert substances used to prepare, preserve, and administer medicines.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <strong className="block mb-1">Solid Vehicles</strong>
                  <ul className="list-disc pl-4 text-xs space-y-1">
                    <li><strong>Sugar of Milk (Lactose):</strong> Main solid vehicle. Prepared from goat/cow milk. Used for triturations.</li>
                    <li><strong>Cane Sugar (Sucrose):</strong> Used for globules/pellets.</li>
                    <li><strong>Globules/Pellets:</strong> Pure cane sugar sizes 10, 15, 20... up to 80.</li>
                    <li><strong>Tablets, Cones.</strong></li>
                  </ul>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <strong className="block mb-1">Liquid Vehicles</strong>
                  <ul className="list-disc pl-4 text-xs space-y-1">
                    <li><strong>Distilled Water:</strong> For mother solutions (Class VA/VB).</li>
                    <li><strong>Alcohol:</strong> Absolute (99.4%), Strong (95%), Dilute, Dispensing alcohol.</li>
                    <li><strong>Glycerine:</strong> For preserving animal poisons (Lachesis) and external glycerols.</li>
                  </ul>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <strong className="block mb-1">Semi-Solid Vehicles</strong>
                  <ul className="list-disc pl-4 text-xs space-y-1">
                    <li><strong>Vaseline:</strong> White/Yellow soft paraffin. Base for ointments.</li>
                    <li><strong>Waxes:</strong> Bees wax, Spermaceti, Lanolin.</li>
                    <li><strong>Soap, Lard, Isinglass.</strong></li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 3 */}
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <button onClick={() => toggle('sec3')} className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left font-bold text-slate-800">
            <span className="flex items-center gap-2"><FlaskConical className="text-purple-500" size={18} /> Section 3: Laboratory & Instruments</span>
            {activeSection === 'sec3' ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
          {activeSection === 'sec3' && (
            <div className="p-4 text-sm text-slate-700 space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="p-2 text-left">Instrument</th>
                      <th className="p-2 text-left">Type / Description</th>
                      <th className="p-2 text-left">Primary Use</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr><td className="p-2 font-medium">Mortar & Pestle</td><td className="p-2">Unglazed porcelain, glass, steel</td><td className="p-2">Triturating solid insoluble substances. Glass used for mercurials.</td></tr>
                    <tr><td className="p-2 font-medium">Percolator</td><td className="p-2">Glass cone with stop-cock</td><td className="p-2">Extracting dried plant/animal drugs via percolation.</td></tr>
                    <tr><td className="p-2 font-medium">Spatula</td><td className="p-2">Horn, porcelain, stainless steel</td><td className="p-2">Scraping during trituration. Horn used for acidic substances.</td></tr>
                    <tr><td className="p-2 font-medium">Balances</td><td className="p-2">Analytical, Chemical, Dispensing</td><td className="p-2">Accurate weighing of drugs (down to mg). Horn pans used for poisons.</td></tr>
                    <tr><td className="p-2 font-medium">Desiccator</td><td className="p-2">Thick walled glass container</td><td className="p-2">Drying and storing substances in a dry, moisture-free atmosphere.</td></tr>
                    <tr><td className="p-2 font-medium">Hydrometer</td><td className="p-2">Glass stem with bulb at bottom</td><td className="p-2">Rapid measurement of Specific Gravity of liquids (alcohol test).</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Section 4 */}
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <button onClick={() => toggle('sec4')} className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left font-bold text-slate-800">
            <span className="flex items-center gap-2"><Scale className="text-orange-500" size={18} /> Section 4: Metrology & Conversions</span>
            {activeSection === 'sec4' ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
          {activeSection === 'sec4' && (
            <div className="p-4 text-sm text-slate-700 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-slate-900 mb-2">Apothecaries System</h4>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>20 Grains (gr.) = 1 Scruple</li>
                  <li>3 Scruples = 1 Drachm (60 grains)</li>
                  <li>8 Drachms = 1 Ounce (480 grains)</li>
                  <li>12 Ounces = 1 Pound (5760 grains)</li>
                  <li className="mt-2 text-slate-500 italic">Liquid:</li>
                  <li>60 Minims (m) = 1 Fluid Drachm</li>
                  <li>8 Fluid Drachms = 1 Fluid Ounce</li>
                  <li>16 Fluid Ounces = 1 Pint</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-2">Metric & Domestic Equivalents</h4>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>1 drop &asymp; 1 minim &asymp; 0.06 ml</li>
                  <li>1 teaspoonful &asymp; 1 fluid drachm &asymp; 4-5 ml</li>
                  <li>1 dessert spoonful &asymp; 2 fluid drachms &asymp; 8 ml</li>
                  <li>1 table-spoonful &asymp; 4 fluid drachms &asymp; 15 ml</li>
                  <li>1 ounce &asymp; 28.35 grams</li>
                  <li>1 fluid ounce &asymp; 28.4 ml</li>
                  <li>Celsius to Fahrenheit: Multiply by 1.8 and add 32</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Section 5 */}
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <button onClick={() => toggle('sec5')} className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left font-bold text-slate-800">
            <span className="flex items-center gap-2"><TableProperties className="text-red-500" size={18} /> Section 5: Old Hahnemannian Classes & Methods</span>
            {activeSection === 'sec5' ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
          {activeSection === 'sec5' && (
            <div className="p-4 text-sm text-slate-700">
              <h4 className="font-bold text-slate-900 mb-2">Classes I to IX</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <strong className="text-xs text-blue-600 uppercase tracking-widest block mb-1">Maceration (Class I, II, III)</strong>
                  <ul className="text-xs space-y-1">
                    <li><strong>Class I</strong>: Most juicy plants. Juice mixed with equal parts strong alcohol. Drug power: 1/2.</li>
                    <li><strong>Class II</strong>: Medium juicy plants. Drug:Alcohol ratio = 3:2. Drug power: 1/2.</li>
                    <li><strong>Class III</strong>: Least juicy plants. Drug:Alcohol ratio = 1:2. Drug power: 1/6.</li>
                  </ul>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <strong className="text-xs text-green-600 uppercase tracking-widest block mb-1">Percolation (Class IV)</strong>
                  <p className="text-xs">
                    <strong>Class IV</strong>: Dried vegetable/animal substances. 1 part drug : 5 parts strong alcohol. Drug power: 1/10.
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <strong className="text-xs text-purple-600 uppercase tracking-widest block mb-1">Solutions (Class V, VI)</strong>
                  <ul className="text-xs space-y-1">
                    <li><strong>Class VA</strong>: Readily soluble in water. Ratio 1:9. DP: 1/10.</li>
                    <li><strong>Class VB</strong>: Soluble in much water. Ratio 1:99. DP: 1/100.</li>
                    <li><strong>Class VIA</strong>: Soluble in alcohol. Ratio 1:9. DP: 1/10.</li>
                    <li><strong>Class VIB</strong>: Soluble in much alcohol. Ratio 1:99. DP: 1/100.</li>
                  </ul>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <strong className="text-xs text-orange-600 uppercase tracking-widest block mb-1">Triturations (Class VII, VIII, IX)</strong>
                  <ul className="text-xs space-y-1">
                    <li><strong>Class VII</strong>: Dry insoluble substances.</li>
                    <li><strong>Class VIII</strong>: Liquid insoluble substances (Petroleum, Venoms).</li>
                    <li><strong>Class IX</strong>: Fresh vegetables/animals. Triturated directly.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 6 & 9 */}
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <button onClick={() => toggle('sec6')} className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left font-bold text-slate-800">
            <span className="flex items-center gap-2"><Zap className="text-yellow-500" size={18} /> Section 6 & 9: Scales, Trituration Process & Potentization</span>
            {activeSection === 'sec6' ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
          {activeSection === 'sec6' && (
            <div className="p-4 text-sm text-slate-700 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 border border-slate-100 rounded-lg shadow-sm">
                  <strong className="block text-indigo-700 mb-1">Decimal Scale (X)</strong>
                  <p className="text-xs">Introduced by C. Hering. Ratio 1:9 (1 part drug to 9 parts vehicle). Gives 10 downward strokes. Scale advances rapidly in volume.</p>
                </div>
                <div className="p-3 border border-slate-100 rounded-lg shadow-sm">
                  <strong className="block text-emerald-700 mb-1">Centesimal Scale (C)</strong>
                  <p className="text-xs">Introduced by Hahnemann. Ratio 1:99. First potency (1C) contains 1/100th part of original drug. Scale used worldwide.</p>
                </div>
                <div className="p-3 border border-slate-100 rounded-lg shadow-sm">
                  <strong className="block text-rose-700 mb-1">50 Millesimal (LM)</strong>
                  <p className="text-xs">Introduced in Organon 6th ed. Ratio 1:50,000. Prevents massive aggravation. Prepared from 3C trituration.</p>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl">
                <h4 className="font-bold text-slate-900 mb-3 border-b border-slate-200 pb-2">The Complete Trituration Process (A to Z)</h4>
                
                <div className="space-y-4">
                  <p className="text-xs text-slate-600">
                    To make the <strong>1st Potency (1X)</strong>, one part of the drug is rubbed with nine parts of Sugar of Milk (Lactose) for exactly <strong>one hour</strong>. The lactose is divided into 3 equal parts.
                  </p>
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex p-3 bg-white border border-slate-100 rounded shadow-sm items-center gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">1</div>
                      <div className="text-xs">
                        <strong>Stage 1 (20 mins):</strong> Add 1 part drug + 1st third of lactose (3 parts).<br/>
                         &bull; Grind/Rub for 6 mins.<br/>
                         &bull; Scrape from mortar/pestle for 3 mins.<br/>
                         &bull; Rub again for 6 mins.<br/>
                         &bull; Scrape for 3 mins.<br/>
                         &bull; Mix for 1 min.
                      </div>
                    </div>
                    
                    <div className="flex p-3 bg-white border border-slate-100 rounded shadow-sm items-center gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700">2</div>
                      <div className="text-xs">
                        <strong>Stage 2 (20 mins):</strong> Add the 2nd third of lactose (3 parts).<br/>
                        Repeat the same exact process of grinding (6m), scraping (3m), grinding (6m), scraping (3m), mixing (1m).
                      </div>
                    </div>

                    <div className="flex p-3 bg-white border border-slate-100 rounded shadow-sm items-center gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-700">3</div>
                      <div className="text-xs">
                        <strong>Stage 3 (20 mins):</strong> Add the final 3rd part of lactose (3 parts).<br/>
                        Repeat grinding and scraping steps. At the end of the 60 minutes, the <strong>1X Trituration</strong> is fully prepared and securely bottled.
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-blue-50 text-blue-800 text-xs rounded border border-blue-100 mt-2">
                    <strong>Conversion to Liquid:</strong> To convert a solid trituration to a liquid potency (Succussion), we take 1 grain of the <strong>6X</strong> (or 3C) trituration, dissolve it in 50 minims of distilled water, add 50 minims of dispensing alcohol, and give 10 powerful downward strokes. This gives the <strong>8X</strong> (or 4C) liquid potency.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Sections 7, 8 */}
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <button onClick={() => toggle('sec7')} className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left font-bold text-slate-800">
            <span className="flex items-center gap-2"><ShieldAlert className="text-rose-500" size={18} /> Section 7-8: Principles, Provings & Limit Tests</span>
            {activeSection === 'sec7' ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
          {activeSection === 'sec7' && (
            <div className="p-4 text-sm text-slate-700 space-y-4">
              <p><strong>Drug Proving:</strong> Tested on healthy individuals (both sexes, different ages) to ascertain pathogenesis. True effects cannot be observed clearly on already sick patients.</p>
              <p><strong>Chromatography & Limit Tests:</strong> Methods (Gas, TLC, Paper) used to analyze purity, isolate active principles, and detect heavy metals (Lead, Arsenic, Chlorides) in mother tinctures to ensure they meet standard Pharmacopoeia levels.</p>
            </div>
          )}
        </div>

        {/* Section 9: Sarcodes, Nosodes, Acids & Relationships */}
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <button onClick={() => toggle('sec9')} className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left font-bold text-slate-800">
            <span className="flex items-center gap-2"><List className="text-cyan-500" size={18} /> Section 9: Sarcodes, Nosodes, Acids & Relationships</span>
            {activeSection === 'sec9' ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
          {activeSection === 'sec9' && (
            <div className="p-4 text-sm text-slate-700 space-y-6">
              
              <div>
                <h4 className="font-bold text-slate-900 mb-2">Sarcodes (Healthy Tissues & Secretions)</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="p-2 text-left">Medicine Name</th>
                        <th className="p-2 text-left">Source (Healthy Tissue/Secretion)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr><td className="p-2 font-medium">Adrenalinum</td><td className="p-2">Adrenal gland secretion</td></tr>
                      <tr><td className="p-2 font-medium">Cholesterinum</td><td className="p-2">Cholesterol (gallstones of ox/human)</td></tr>
                      <tr><td className="p-2 font-medium">Insulinum</td><td className="p-2">Insulin from Islets of Langerhans</td></tr>
                      <tr><td className="p-2 font-medium">Oophorinum</td><td className="p-2">Ovarian fluid/gland of cow or sheep</td></tr>
                      <tr><td className="p-2 font-medium">Pancreatinum</td><td className="p-2">Pancreatic juice/gland</td></tr>
                      <tr><td className="p-2 font-medium">Pepsinum</td><td className="p-2">Enzyme from gastric juice</td></tr>
                      <tr><td className="p-2 font-medium">Thyroidinum</td><td className="p-2">Thyroid gland of sheep or calf</td></tr>
                      <tr><td className="p-2 font-medium">Pituitrinum</td><td className="p-2">Pituitary gland</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-2">Nosodes (Diseased Tissues & Pathogens)</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="p-2 text-left">Medicine Name</th>
                        <th className="p-2 text-left">Source (Disease Product)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr><td className="p-2 font-medium">Anthracinum</td><td className="p-2">Poison of Anthrax (from spleen of infected cattle)</td></tr>
                      <tr><td className="p-2 font-medium">Carcinosinum</td><td className="p-2">Cancerous tissue (often breast cancer)</td></tr>
                      <tr><td className="p-2 font-medium">Diphtherinum</td><td className="p-2">Diphtheric membrane</td></tr>
                      <tr><td className="p-2 font-medium">Medorrhinum</td><td className="p-2">Gonorrheal discharge</td></tr>
                      <tr><td className="p-2 font-medium">Psorinum</td><td className="p-2">Seropurulent matter from a scabies vesicle</td></tr>
                      <tr><td className="p-2 font-medium">Pyrogenium</td><td className="p-2">Rotten lean beef (sepsis)</td></tr>
                      <tr><td className="p-2 font-medium">Syphilinum</td><td className="p-2">Syphilitic virus/lesion</td></tr>
                      <tr><td className="p-2 font-medium">Tuberculinum</td><td className="p-2">Tubercular abscess (bovine or human origin)</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-2">Mineral Acids</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="p-2 text-left">Medicine Name</th>
                        <th className="p-2 text-left">Chemical Formula</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr><td className="p-2 font-medium">Acidum Nitricum (Nitric Acid)</td><td className="p-2">HNO₃</td></tr>
                      <tr><td className="p-2 font-medium">Acidum Sulphuricum (Sulphuric Acid)</td><td className="p-2">H₂SO₄</td></tr>
                      <tr><td className="p-2 font-medium">Acidum Phosphoricum (Phosphoric Acid)</td><td className="p-2">H₃PO₄</td></tr>
                      <tr><td className="p-2 font-medium">Acidum Muriaticum (Hydrochloric Acid)</td><td className="p-2">HCl</td></tr>
                      <tr><td className="p-2 font-medium">Acidum Fluoricum (Hydrofluoric Acid)</td><td className="p-2">HF</td></tr>
                      <tr><td className="p-2 font-medium">Acidum Aceticum (Acetic Acid)</td><td className="p-2">CH₃COOH (Organic but included functionally)</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-2">Remedy Relationships</h4>
                <ul className="list-disc pl-5 space-y-2 text-xs">
                  <li><strong>Complementary:</strong> Remedies that complete the cure initiated by an earlier remedy. E.g., <em>Belladonna</em> is complementary to <em>Calcarea Carb</em>.</li>
                  <li><strong>Concordant / Compatible:</strong> Remedies that follow each other well but have similar origins or broad actions. E.g., <em>Pulsatilla</em> follows well after <em>Sepia</em>.</li>
                  <li><strong>Inimical:</strong> Remedies that do not follow each other well and may cause severe aggravation if given to the same patient shortly after each other. E.g., <em>Apis Mel</em> and <em>Rhus Tox</em>.</li>
                  <li><strong>Antidote:</strong> A remedy that stops or reverses the pathogenetic or toxic effects of a previously given medicine. E.g., <em>Camphor</em> antidotes many vegetable remedies.</li>
                </ul>
              </div>

            </div>
          )}
        </div>

        {/* Section 10: Posology Factors & A-Z Trituration Table */}
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <button onClick={() => toggle('sec10')} className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left font-bold text-slate-800">
            <span className="flex items-center gap-2"><TableProperties className="text-indigo-500" size={18} /> Section 10: Posology Factors & A-Z Trituration Table</span>
            {activeSection === 'sec10' ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
          {activeSection === 'sec10' && (
            <div className="p-4 text-sm text-slate-700 space-y-6">
              
              <div>
                <h4 className="font-bold text-slate-900 mb-2">Posology Factors (Selection of Dose & Potency)</h4>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li><strong>Susceptibility:</strong> Higher susceptibility = higher potency. Influenced by age, habit, environment, and pathological state.</li>
                  <li><strong>Nature of Disease:</strong> Functional diseases respond to high potencies; organic or terminal conditions require low potencies.</li>
                  <li><strong>Seat of Disease:</strong> The more vital the organ involved, the more material/lower the dose should be.</li>
                  <li><strong>Previous Treatment:</strong> History of heavy allopathic drugging often indicates a need for higher potencies or careful repetition.</li>
                  <li><strong>Repetition:</strong> Small doses repeated frequently in acute cases; chronic cases need infrequent repetition of higher potencies.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-2">A-Z Medicines Prepared via Trituration (Formulas & Process)</h4>
                <p className="mb-4 text-xs text-slate-500">Method: 1 hour of trituration represents 3 stages of 20 minutes (6 min grinding + 3 min scraping + 1 min mixing, repeated twice per stage) with Sugar of Milk (Saccharum Lactis).</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="p-2 text-left">Medicine (A-Z)</th>
                        <th className="p-2 text-left">Class / Source</th>
                        <th className="p-2 text-left">Formula (Drug : Vehicle)</th>
                        <th className="p-2 text-center">Process Illustration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="p-2 font-bold text-blue-700">Alumina (Alum.)</td>
                        <td className="p-2">Class VII (Dry Insoluble)</td>
                        <td className="p-2">1 part drug + 99 parts Sugar of Milk</td>
                        <td className="p-2 text-center">
                          <img src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=150&h=100" alt="Mortar and Pestle" className="inline-block rounded-md object-cover h-12 w-20 border border-slate-200" />
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-blue-700">Aurum Metallicum</td>
                        <td className="p-2">Class VII (Metal)</td>
                        <td className="p-2">1 part metal + 99 parts Sugar of Milk</td>
                        <td className="p-2 text-center">
                          <img src="https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=150&h=100" alt="Trituration Process" className="inline-block rounded-md object-cover h-12 w-20 border border-slate-200" />
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-blue-700">Calcarea Carbonica</td>
                        <td className="p-2">Class VII (Mineral)</td>
                        <td className="p-2">1 part Oyster shell + 99 parts Sugar of Milk</td>
                        <td className="p-2 text-center">
                          <img src="https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&q=80&w=150&h=100" alt="Powdered Shells" className="inline-block rounded-md object-cover h-12 w-20 border border-slate-200" />
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-blue-700">Graphites</td>
                        <td className="p-2">Class VII (Mineral)</td>
                        <td className="p-2">1 part Plumbago + 99 parts Sugar of Milk</td>
                        <td className="p-2 text-center">
                          <img src="https://images.unsplash.com/photo-1585435421671-0c16764628ce?auto=format&fit=crop&q=80&w=150&h=100" alt="Grinding" className="inline-block rounded-md object-cover h-12 w-20 border border-slate-200" />
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-blue-700">Lycopodium Clavatum</td>
                        <td className="p-2">Class VII (Spores)</td>
                        <td className="p-2">1 part Spores + 99 parts Sugar of Milk</td>
                        <td className="p-2 text-center">
                          <img src="https://images.unsplash.com/photo-1542841791-375a060d4b08?auto=format&fit=crop&q=80&w=150&h=100" alt="Spores" className="inline-block rounded-md object-cover h-12 w-20 border border-slate-200" />
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-blue-700">Mercurius Solubilis</td>
                        <td className="p-2">Class VII (Chemical)</td>
                        <td className="p-2">1 part Mercury salt + 99 parts Sugar of Milk</td>
                        <td className="p-2 text-center">
                          <img src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=150&h=100" alt="Chemistry" className="inline-block rounded-md object-cover h-12 w-20 border border-slate-200" />
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-blue-700">Petroleum</td>
                        <td className="p-2">Class VIII (Liquid Insoluble)</td>
                        <td className="p-2">1 part Oil + 99 parts Sugar of Milk</td>
                        <td className="p-2 text-center">
                          <img src="https://images.unsplash.com/photo-1616422285623-14bd6dd4a179?auto=format&fit=crop&q=80&w=150&h=100" alt="Oily triturating" className="inline-block rounded-md object-cover h-12 w-20 border border-slate-200" />
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-blue-700">Sepia</td>
                        <td className="p-2">Class VII (Animal)</td>
                        <td className="p-2">1 part Inky juice + 99 parts Sugar of Milk</td>
                        <td className="p-2 text-center">
                          <img src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=150&h=100" alt="Cuttlefish ink" className="inline-block rounded-md object-cover h-12 w-20 border border-slate-200" />
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-blue-700">Silicea</td>
                        <td className="p-2">Class VII (Mineral)</td>
                        <td className="p-2">1 part Flint + 99 parts Sugar of Milk</td>
                        <td className="p-2 text-center">
                          <img src="https://images.unsplash.com/photo-1550572017-edb73a216194?auto=format&fit=crop&q=80&w=150&h=100" alt="Flint" className="inline-block rounded-md object-cover h-12 w-20 border border-slate-200" />
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-blue-700">Zincum Metallicum</td>
                        <td className="p-2">Class VII (Metal)</td>
                        <td className="p-2">1 part Zinc + 99 parts Sugar of Milk</td>
                        <td className="p-2 text-center">
                          <img src="https://images.unsplash.com/photo-1590610196884-6a9783f360ba?auto=format&fit=crop&q=80&w=150&h=100" alt="Zinc" className="inline-block rounded-md object-cover h-12 w-20 border border-slate-200" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
