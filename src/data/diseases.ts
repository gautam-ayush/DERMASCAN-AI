import { DiseaseInfo } from '../types';

export const DISEASES_DATABASE: DiseaseInfo[] = [
  {
    id: 'atopic-dermatitis',
    name: 'Atopic Dermatitis (Eczema)',
    slug: 'atopic-dermatitis',
    category: 'Inflammatory Dermatosis',
    typicalSeverity: 'Moderate',
    description:
      'Atopic dermatitis is a chronic, non-contagious inflammatory skin condition characterized by dry, pruritic (itchy), and erythematous patches. It frequently follows a relapsing course with periods of flare-ups and quiescence. It is closely linked to epidermal skin barrier dysfunction and immune system dysregulation.',
    symptoms: [
      'Intense pruritus (itching), often worsening during the night',
      'Dry, cracked, or scaly erythematous (red/inflamed) patches',
      'Small raised bumps that may exude fluid and crust when scratched',
      'Lichenification (thickened, leathery skin) from chronic rubbing',
      'Sensitive, raw, or swollen skin primarily on flexural creases (elbows, knees, wrists)'
    ],
    causes: [
      'Genetic mutations affecting epidermal barrier proteins, notably filaggrin (FLG)',
      'Dysregulated cutaneous immune response involving Th2 pathway activation',
      'Environmental contact irritants such as harsh soaps, detergents, and synthetic fabrics',
      'Climatic factors including low humidity, extreme cold, or excessive dry heat'
    ],
    risk_factors: [
      'Personal or family history of atopic triad (eczema, allergic rhinitis, or asthma)',
      'Occupational exposure to frequent wet-work or industrial chemical irritants',
      'Living in urban areas with elevated atmospheric particulate pollution or cold dry climates',
      'Stress and sleep disturbances exacerbating neuro-immunological skin pathways'
    ],
    prevention: [
      'Apply ceramide-rich or fragrance-free lipid emollients within 3 minutes of bathing (soak-and-seal)',
      'Use lukewarm water for short baths or showers (5 to 10 minutes) rather than hot water',
      'Wear soft, breathable natural fibers such as 100% cotton; avoid wool or coarse polyester',
      'Maintain an indoor relative humidity of 40%–50% using humidifiers when necessary'
    ],
    general_management: [
      'Consistent barrier restoration therapy using bland ointments or thick creams twice daily',
      'Identification and systematic avoidance of individual triggers (irritants, wool, fragrances)',
      'Gentle skin cleansing utilizing non-soap syndet cleansers with neutral to slightly acidic pH',
      'Cool compresses applied to acutely inflamed areas to alleviate burning and itch sensations',
      'Consultation with a clinician for potential prescription topical therapies (e.g., topical corticosteroids, topical calcineurin inhibitors, or PDE4 inhibitors as directed by a physician)'
    ],
    when_to_seek_care: [
      'The skin exhibits signs of secondary bacterial infection: yellow crusting, purulent oozing, or warmth',
      'The condition severely disrupts sleep, daily occupational tasks, or quality of life',
      'Spreading pain, marked swelling, or systemic fever develops',
      'Symptoms fail to improve despite consistent emollient and trigger-avoidance measures'
    ],
    warning_signs: [
      'Rapid onset of widespread painful grouped blisters (may indicate Eczema Herpeticum, requiring urgent medical care)',
      'Expanding redness with red streaks extending toward regional lymph nodes'
    ],
    sources: [
      'American Academy of Dermatology (AAD) Clinical Guidelines for Atopic Dermatitis',
      'National Eczema Association (NEA) Clinical Consensus',
      'World Health Organization (WHO) Dermatological Disease Profiles'
    ]
  },
  {
    id: 'psoriasis-vulgaris',
    name: 'Psoriasis (Plaque Psoriasis)',
    slug: 'psoriasis-vulgaris',
    category: 'Autoimmune Papulosquamous Disorder',
    typicalSeverity: 'Moderate',
    description:
      'Psoriasis is a chronic, immune-mediated systemic inflammatory disorder characterized by hyperproliferation of keratinocytes, resulting in well-demarcated erythematous plaques covered with coarse, silvery-white micaceous scales, frequently appearing on extensor surfaces.',
    symptoms: [
      'Sharply circumscribed red plaques capped with thick, silvery-white scale layers',
      'Auspitz sign (pinpoint bleeding when scale is gently peeled away)',
      'Dry, cracked skin that may fissure and bleed',
      'Itching, burning, or soreness localized to the affected plaques',
      'Pitting, discoloration, or subungual hyperkeratosis of fingernails and toenails'
    ],
    causes: [
      'Autoimmune dysregulation driven by IL-23 / IL-17 / TNF-alpha inflammatory cytokine cascade',
      'Accelerated keratinocyte turnover cycle (from normal 28 days to approximately 3 to 5 days)',
      'Strong genetic predisposition involving HLA-Cw6 and other PSORS loci',
      'Koebner phenomenon: development of new lesions at sites of mechanical trauma or friction'
    ],
    risk_factors: [
      'Positive first-degree family history of psoriasis or psoriatic arthritis',
      'Physiological or emotional stress triggering immune flare-ups',
      'Infections such as streptococcal pharyngitis triggering guttate exacerbation',
      'Smoking, heavy alcohol consumption, and metabolic syndrome'
    ],
    prevention: [
      'Protect the skin against physical cuts, abrasions, sunburns, and chemical trauma',
      'Maintain daily moisturization to soften hyperkeratotic plaques and minimize cracking',
      'Adopt active stress reduction techniques and maintain balanced metabolic health',
      'Avoid sudden discontinuation of systemic therapies without medical oversight'
    ],
    general_management: [
      'Liberal application of keratolytic emollients (containing salicylic acid, urea, or lactic acid)',
      'Controlled moderate natural sunlight exposure (phototherapy principle under clinical guidance)',
      'Specialized scalp shampoo regimens containing coal tar or salicylic acid',
      'Evaluation by a board-certified dermatologist for prescription topical, phototherapeutic, or targeted biologic options'
    ],
    when_to_seek_care: [
      'Plaques spread rapidly to cover large body surface areas (erythrodermic risk)',
      'Joint stiffness, tenderness, or swelling emerges (suggestive of psoriatic arthritis)',
      'Pustular lesions develop across red, tender skin patches',
      'Standard over-the-counter soothing measures provide inadequate relief'
    ],
    warning_signs: [
      'Generalized redness over >80% of body surface area with chills or temperature instability',
      'Severe joint swelling or debilitating morning stiffness'
    ],
    sources: [
      'National Psoriasis Foundation (NPF) Practice Parameters',
      'Journal of the American Academy of Dermatology (JAAD) Psoriasis Guidelines',
      'British Association of Dermatologists (BAD) Psoriasis Guidelines'
    ]
  },
  {
    id: 'contact-dermatitis',
    name: 'Contact Dermatitis',
    slug: 'contact-dermatitis',
    category: 'Exogenous Dermatosis',
    typicalSeverity: 'Low',
    description:
      'Contact dermatitis is an acute or subacute cutaneous inflammatory reaction provoked by direct topical exposure to an external agent. It is categorized into Irritant Contact Dermatitis (ICD, non-immunologic physical damage) and Allergic Contact Dermatitis (ACD, type IV delayed hypersensitivity).',
    symptoms: [
      'Erythematous rash confined strictly to the distribution of contact (e.g., under a watchband or belt buckle)',
      'Pruritus, stinging, or distinct cutaneous burning sensations',
      'Vesicles, papules, or blister formation in moderate to acute cases',
      'Edema (swelling) and localized heat sensation',
      'Dry, cracked, or peeling skin in chronic or repeated low-grade exposures'
    ],
    causes: [
      'Allergic: Nickel in jewelry, fragrance mixes, topical preservatives (methylisothiazolinone), poison ivy urushiol',
      'Irritant: Harsh industrial detergents, solvent cleaners, frequent handwashing with alkaline soaps, wet cement'
    ],
    risk_factors: [
      'Occupations involving recurrent chemical or solvent exposure (healthcare workers, hairstylists, mechanics)',
      'Pre-existing underlying cutaneous barrier compromise or atopic diathesis',
      'Wearing inexpensive costume jewelry or metallic accessories with leachable nickel'
    ],
    prevention: [
      'Identify and rigorously eliminate causative allergen or irritant agents',
      'Wear protective nitrile or cotton-lined gloves during household cleaning or chemical handling',
      'Apply silicone- or dimethicone-based barrier creams before hazardous exposures',
      'Thoroughly rinse skin with mild cleanser immediately following incidental contact'
    ],
    general_management: [
      'Immediate cessation of contact with suspected trigger substances',
      'Cold compress application using damp saline or cool water compresses for 15 minutes',
      'Calamine or colloidal oatmeal baths to soothe acute cutaneous irritation',
      'Physician-directed patch testing (TRUE test) if the allergen identity remains ambiguous'
    ],
    when_to_seek_care: [
      'The rash involves sensitive mucosal surfaces, eyes, eyelids, or genitals',
      'Blisters are severe, extensive, or developing secondary pus crusting',
      'The eruption shows no signs of resolution after 1 to 2 weeks of trigger avoidance'
    ],
    warning_signs: [
      'Facial or airway swelling, difficulty breathing, or anaphylactoid signs (immediate emergency care)',
      'Rapidly spreading fever with purulent skin drainage'
    ],
    sources: [
      'American Contact Dermatitis Society (ACDS) Core Allergens Consensus',
      'Mayo Clinic Patient Education Series: Contact Dermatitis',
      'European Society of Contact Dermatitis (ESCD) Management Guidelines'
    ]
  },
  {
    id: 'acne-vulgaris',
    name: 'Acne Vulgaris',
    slug: 'acne-vulgaris',
    category: 'Pilosebaceous Unit Disorder',
    typicalSeverity: 'Low',
    description:
      'Acne vulgaris is a multifactorial inflammatory disease of the pilosebaceous follicle affecting predominantly adolescents and young adults. Pathogenesis involves follicular hyperkeratinization, excess sebum production under androgenic stimulation, Cutibacterium acnes colonization, and innate immune activation.',
    symptoms: [
      'Non-inflammatory comedones: closed comedones (whiteheads) and open comedones (blackheads)',
      'Inflammatory papules and pustules with erythematous borders',
      'Nodules or deep fluctuant pseudocysts in severe forms',
      'Post-inflammatory erythema (PIE) or hyperpigmentation (PIH) following resolution',
      'Potential atrophic or hypertrophic cicatricial scarring'
    ],
    causes: [
      'Retention hyperkeratosis occluding the infundibular follicular canal',
      'Androgen-mediated hypersecretion of sebum from enlarged sebaceous glands',
      'Proliferation of Cutibacterium acnes triggering TLR-2 mediated cytokine release',
      'Follicular wall rupture releasing keratinaceous debris into surrounding dermis'
    ],
    risk_factors: [
      'Hormonal fluctuations (puberty, menstrual cycles, polycystic ovary syndrome)',
      'Application of comedogenic cosmetic formulations, heavy oils, or pomades',
      'Mechanical friction and occlusion (acne mechanica from helmets, masks, tight collars)',
      'Diets with high glycemic load or excessive whey protein intake'
    ],
    prevention: [
      'Wash affected skin gently twice daily with a non-comedogenic, pH-balanced cleanser',
      'Never manually squeeze, pick, or manipulate lesions to avoid scarring and secondary infection',
      'Inspect skincare and makeup labels to ensure non-comedogenic (oil-free) designations',
      'Cleanse skin promptly following vigorous physical exertion and perspiration'
    ],
    general_management: [
      'Consistent use of non-comedogenic cleansers and lightweight water-based moisturizers',
      'Topical over-the-counter agents such as salicylic acid (BHA) or benzoyl peroxide cleansers',
      'Consistent daily broad-spectrum SPF 30+ non-greasy sunscreen to prevent dark marks (PIH)',
      'Dermatologist consultation for prescription retinoids, topical antimicrobials, or oral therapies'
    ],
    when_to_seek_care: [
      'Development of deep, painful, cystic, or nodular lesions that resist over-the-counter care',
      'Evidence of permanent indentation or ice-pick scarring forming on the face or torso',
      'Sudden onset in adulthood accompanied by excess facial hair, hair loss, or menstrual irregularity'
    ],
    warning_signs: [
      'Painful fluctuant subcutaneous abscess formation requiring medical drainage',
      'Severe psychological distress or depression related to skin appearance'
    ],
    sources: [
      'American Academy of Dermatology (AAD) Acne Management Guidelines',
      'Global Alliance to Improve Outcomes in Acne Consensus Papers',
      'Cochrane Database of Systematic Reviews: Topical Interventions for Acne'
    ]
  },
  {
    id: 'melanocytic-nevus',
    name: 'Benign Melanocytic Nevus (Mole)',
    slug: 'melanocytic-nevus',
    category: 'Benign Melanocytic Neoplasm',
    typicalSeverity: 'Low',
    description:
      'A benign melanocytic nevus is a common, non-cancerous proliferation of melanocytic nevus cells arranged in nests within the epidermis, dermis, or dermo-epidermal junction. They present as evenly pigmented macules, papules, or small plaques with uniform color and symmetrical borders.',
    symptoms: [
      'Symmetric round or oval shape with clear, well-demarcated contours',
      'Uniform brown, tan, flesh-colored, or black pigmentation across the entire lesion',
      'Usually smaller than 6 millimeters (approximate diameter of a pencil eraser)',
      'Flat (junctional), slightly raised (compound), or dome-shaped (intradermal)',
      'Stable appearance over years without sudden spontaneous evolution'
    ],
    causes: [
      'Localized clonal proliferation of melanocytes during childhood, adolescence, or early adulthood',
      'Activating somatic mutations, most frequently BRAF V600E, followed by stable oncogene-induced senescence',
      'Cumulative solar ultraviolet (UV) radiation exposure promoting melanocyte proliferation'
    ],
    risk_factors: [
      'Fair skin phenotypes (Fitzpatrick phototypes I and II) with light eye and hair color',
      'History of recurrent blistering sunburns during childhood and adolescence',
      'Genetic predisposition to a high total count of typical or atypical nevi',
      'Family history of dysplastic nevi'
    ],
    prevention: [
      'Practice strict photoprotection: broad-spectrum UVA/UVB sunscreen (SPF 30+ or higher)',
      'Seek shade during peak solar irradiance hours (10:00 AM to 4:00 PM)',
      'Wear wide-brimmed hats and ultraviolet-protective clothing (UPF rated)',
      'Perform monthly self-skin examinations utilizing the standard ABCDE criteria'
    ],
    general_management: [
      'Periodic self-monitoring utilizing clinical photography to detect subtle morphological shifts',
      'Annual full-body skin examination by a qualified dermatologist for baseline mapping',
      'Protection against mechanical shearing from clothing or shaving',
      'Clinical dermoscopy and biopsy if any nevus manifests atypical features'
    ],
    when_to_seek_care: [
      'Any nevus exhibiting the ABCDE criteria (Asymmetry, Border irregularity, Color variegation, Diameter > 6mm, or Evolving change)',
      'Development of an "Ugly Duckling" lesion that looks distinctly different from all surrounding moles',
      'New onset of bleeding, persistent itching, ulceration, or oozing without preceding trauma'
    ],
    warning_signs: [
      'Rapid change in size, shape, elevation, or elevation within weeks to months',
      'Multiple colors within one lesion (shades of black, red, white, or blue)'
    ],
    sources: [
      'Skin Cancer Foundation Melanoma & Nevi Guidelines',
      'National Cancer Institute (NCI) Melanocytic Lesion Diagnostic Criteria',
      'International Dermoscopy Society (IDS) Guidelines for Nevus Evaluation'
    ]
  },
  {
    id: 'seborrheic-keratosis',
    name: 'Seborrheic Keratosis',
    slug: 'seborrheic-keratosis',
    category: 'Benign Epithelial Neoplasm',
    typicalSeverity: 'Low',
    description:
      'Seborrheic keratosis is one of the most common non-cancerous benign skin neoplasms in mature adults. They originate from epidermal keratinocytes and present characteristically as warty, hyperkeratotic, "stuck-on" papules or plaques with a waxy, granular surface.',
    symptoms: [
      'Well-circumscribed papule or plaque appearing as if "pasted" onto the cutaneous surface',
      'Waxy, velvety, verrucous, or dull granular surface texture',
      'Color spectrum ranging from pale tan, yellowish-brown to deep black',
      'Commonly asymptomatic, though occasional pruritus or friction irritation may occur',
      'Usually located on the chest, back, neck, face, and shoulder regions'
    ],
    causes: [
      'Benign clonal proliferation of epidermal keratinocytes associated with natural biological aging',
      'Somatic mutations in FGFR3 (fibroblast growth factor receptor 3) and PIK3CA genes',
      'Cumulative lifetime ultraviolet radiation and genetic predisposition'
    ],
    risk_factors: [
      'Age greater than 40 to 50 years; prevalence increases substantially with advancing age',
      'Light skin phototypes and positive family history of multiple seborrheic keratoses',
      'Frequent chronic exposure to sunlight over many years'
    ],
    prevention: [
      'No specific method prevents seborrheic keratoses from forming, as they are part of natural skin aging',
      'Regular broad-spectrum sun protection helps reduce overall solar cutaneous wear',
      'Avoid attempting to pick, scratch, or scrape off growths at home'
    ],
    general_management: [
      'Reassurance of benign biological nature once professionally verified by a clinician',
      'Avoidance of repetitive mechanical irritation from tight jewelry or collar seams',
      'Professional clinical removal (cryotherapy, curettage, electrodessication) if symptomatic or irritated',
      'Clinical dermoscopy to confirm benign architectural patterns'
    ],
    when_to_seek_care: [
      'A lesion grows unusually fast, bleeds easily, or becomes tender to the touch',
      'The growth is pitch black or displays irregular borders, mimicking melanoma',
      'Sudden eruptive emergence of dozens of itchy seborrheic keratoses (Leser-Trélat sign consideration)'
    ],
    warning_signs: [
      'Spontaneous bleeding, crusting, or painful ulceration',
      'A lesion that cannot be distinguished with certainty from a dysplastic nevus or melanoma'
    ],
    sources: [
      'British Association of Dermatologists (BAD) Seborrheic Keratosis Information',
      'American Academy of Dermatology (AAD) Benign Skin Lesions Reference',
      'DermNet New Zealand Clinical Atlas'
    ]
  },
  {
    id: 'tinea-corporis',
    name: 'Tinea Corporis (Fungal Infection / Ringworm)',
    slug: 'tinea-corporis',
    category: 'Superficial Dermatophytosis',
    typicalSeverity: 'Low',
    description:
      'Tinea corporis is a superficial fungal infection of the glabrous skin caused by keratinophilic fungi known as dermatophytes (Trichophyton, Microsporum, or Epidermophyton species). It presents classically as an expanding annular (ring-shaped) erythematous patch with a raised active scaly border and central clearing.',
    symptoms: [
      'Annular, circular erythematous patch with an elevated, sharply defined scaly perimeter',
      'Central clearing creating a ring-like visual appearance',
      'Mild to intense pruritus localized to the lesion border',
      'Potential presence of tiny peripheral vesicles or papules along the advancing edge',
      'Possible single or multiple lesions coalescing into polycyclic shapes'
    ],
    causes: [
      'Infection by dermatophyte species, predominantly Trichophyton rubrum or Trichophyton mentagrophytes',
      'Direct skin-to-skin contact with an infected human, household pet (cats, dogs), or farm animal',
      'Fomite transmission through shared contaminated towels, sports gear, bedding, or wrestling mats'
    ],
    risk_factors: [
      'Living in warm, humid tropical or semi-tropical climates',
      'Participation in close-contact sports (wrestling, martial arts, rugby)',
      'Immunocompromised states, diabetes mellitus, or poor peripheral circulation',
      'Sharing personal hygienic items such as towels, hairbrushes, or clothing'
    ],
    prevention: [
      'Keep skin clean, dry, and well-ventilated, especially in skin folds and friction areas',
      'Do not share personal clothing, towels, athletic equipment, or combs with others',
      'Have domestic pets evaluated and treated promptly by a veterinarian if they exhibit hair loss patches',
      'Wear protective footwear in public gym locker rooms, saunas, and communal showers'
    ],
    general_management: [
      'Keep the affected skin region washed with clean water and patted completely dry',
      'Wash contaminated clothing and bedding in hot water with laundry detergent',
      'Avoid applying topical steroid creams alone (can cause Tinea Incognito and worsen infection)',
      'Consult a healthcare provider for evaluation and appropriate targeted antifungal therapies'
    ],
    when_to_seek_care: [
      'The ring-shaped lesion spreads across extensive body areas or onto the scalp or beard',
      'There is no visual improvement after two weeks of standard care',
      'Secondary bacterial infection signs develop (increasing warmth, severe throbbing pain, pus)'
    ],
    warning_signs: [
      'Rapidly enlarging painful cellulitic area or red streaks spreading outward',
      'Involvement of nails or scalp leading to broken hairs and scarring'
    ],
    sources: [
      'Centers for Disease Control and Prevention (CDC) Fungal Diseases - Ringworm',
      'World Health Organization (WHO) Guidelines for Fungal Skin Infections',
      'American Academy of Family Physicians (AAFP) Dermatophyte Infections Review'
    ]
  },
  {
    id: 'rosacea',
    name: 'Rosacea',
    slug: 'rosacea',
    category: 'Chronic Facial Vascular Dermatosis',
    typicalSeverity: 'Moderate',
    description:
      'Rosacea is a chronic inflammatory dermatosis characterized by recurrent central facial erythema, flushing, telangiectasias (dilated superficial blood vessels), and occasionally inflammatory papules and pustules. Unlike acne, comedones are characteristically absent.',
    symptoms: [
      'Frequent transient flushing and persistent central facial erythema (cheeks, nose, forehead, chin)',
      'Visible superficial telangiectatic blood vessels (spider veins)',
      'Erythematous papules and pustules without comedones (whiteheads/blackheads)',
      'Facial stinging, burning, or increased skin sensitivity to topical products',
      'Ocular symptoms: gritty, dry sensation, blepharitis, or conjunctival injection'
    ],
    causes: [
      'Innate immune system dysregulation with cathelicidin antimicrobial peptide (LL-37) overproduction',
      'Neurovascular dysregulation leading to abnormal vasodilation and cutaneous hyperreactivity',
      'Microbiome alterations, particularly overpopulation of Demodex folliculorum mites and skin commensals',
      'Environmental thermal triggers causing sustained microvascular dilation'
    ],
    risk_factors: [
      'Fair skin phototypes (Fitzpatrick I–II), particularly of Celtic or Northern European descent',
      'Age between 30 and 60 years, with higher diagnosis rates in women',
      'Family history of rosacea or facial flushing tendencies'
    ],
    prevention: [
      'Identify and avoid known individual flush triggers (spicy food, hot beverages, alcohol, extreme weather)',
      'Apply gentle mineral-based (zinc oxide / titanium dioxide) broad-spectrum SPF 30+ daily',
      'Protect face from harsh winds and extreme winter cold with scarves or thermal face coverings',
      'Avoid facial scrubs, chemical peels, astringents, and products containing alcohol or menthol'
    ],
    general_management: [
      'Use ultra-mild, fragrance-free cleansers applied with fingertips only—never washcloths',
      'Apply non-irritating soothing moisturizers containing niacinamide or green tea extract',
      'Maintain an environmental trigger diary to systematically isolate personal flare catalysts',
      'Consultation with a dermatologist for targeted topical agents (metronidazole, ivermectin, azelaic acid) or vascular laser therapies'
    ],
    when_to_seek_care: [
      'Ocular symptoms arise (foreign-body sensation, eye pain, light sensitivity, or blurred vision)',
      'Tissue hypertrophy occurs, such as nasal skin thickening and bulbous enlargement (rhinophyma)',
      'Facial burning or erythema is severe, persistent, and causing substantial distress'
    ],
    warning_signs: [
      'Corneal complications or persistent ocular pain requiring prompt ophthalmologic assessment',
      'Rapid thickening of nasal skin or disfiguring contour shifts'
    ],
    sources: [
      'National Rosacea Society (NRS) Expert Committee Consensus',
      'Journal of the American Academy of Dermatology (JAAD) Rosacea Classification and Care',
      'British Association of Dermatologists Guidelines for the Management of Rosacea'
    ]
  },
  {
    id: 'urticaria',
    name: 'Urticaria (Hives)',
    slug: 'urticaria',
    category: 'Vascular / Immunological Reaction',
    typicalSeverity: 'Moderate',
    description:
      'Urticaria is a cutaneous vascular reaction marked by transient, erythematous, edematous wheals (plaques) that are intensely pruritic. Individual lesions typically emerge rapidly and resolve within 24 hours without residual scarring, although new lesions may continue to form.',
    symptoms: [
      'Elevated, intensely itchy wheals or welts with erythematous borders and pale centers',
      'Transient nature of individual lesions (lasting hours before disappearing while new ones arise)',
      'Pruritus often intensifying with warmth or mechanical friction',
      'Occasional swelling of deeper subcutaneous tissue (angioedema) involving lips or eyelids'
    ],
    causes: [
      'Histamine and cytokine release from cutaneous mast cells',
      'Allergic triggers: foods, medications (NSAIDs, antibiotics), or insect envenomation',
      'Physical stimuli: pressure, cold, heat, sunlight, or physical exertion',
      'Infectious triggers: viral respiratory or gastrointestinal infections'
    ],
    risk_factors: [
      'History of allergic rhinitis, asthma, or atopic diathesis',
      'Autoimmune thyroiditis or underlying connective tissue disorders',
      'Acute viral illness, especially in pediatric and young adult populations'
    ],
    prevention: [
      'Identify and strictly avoid verified food, chemical, or physical catalysts',
      'Avoid tight, restrictive synthetic garments that induce localized pressure and friction',
      'Keep showers and ambient water cool or lukewarm rather than scalding hot'
    ],
    general_management: [
      'Second-generation non-sedating H1 antihistamines as primary clinical therapy',
      'Cold compresses applied to relieve intense localized burning and pruritus',
      'Bland soothing calamine or mentholated lotions for temporary symptomatic relief',
      'Consultation with a physician or allergist for persistent or chronic presentations'
    ],
    when_to_seek_care: [
      'Swelling spreads to the tongue, throat, or lips causing difficulty breathing (anaphylaxis - emergency)',
      'Hives persist daily for more than 6 weeks without known precipitating cause',
      'Lesions are painful rather than itchy or leave persistent purpuric staining'
    ],
    warning_signs: [
      'Throat tightness, hoarseness, dizziness, or respiratory wheezing requires emergency 911 / ER care',
      'Joint pains, high fever, or systemic malaise accompanied by persistent wheals'
    ],
    sources: [
      'World Allergy Organization (WAO) Guidelines for the Assessment of Urticaria',
      'American Academy of Dermatology (AAD) Urticaria Clinical Guidelines'
    ]
  },
  {
    id: 'vitiligo',
    name: 'Vitiligo',
    slug: 'vitiligo',
    category: 'Autoimmune Pigmentary Disorder',
    typicalSeverity: 'Moderate',
    description:
      'Vitiligo is an acquired autoimmune dermatosis characterized by selective destruction of cutaneous melanocytes, resulting in sharply demarcated, amelanotic (chalk-white) patches of skin and hair.',
    symptoms: [
      'Sharply demarcated depigmented (porcelain or chalk-white) macules and patches',
      'Often symmetric involvement around body orifices (mouth, eyes) and extensor surfaces (hands, elbows)',
      'Premature graying or whitening of scalp hair, eyebrows, or beard (poliosis)',
      'Heightened sensitivity to ultraviolet sunburn in amelanotic zones'
    ],
    causes: [
      'Autoimmune CD8+ T-cell mediated destruction of epidermal melanocytes',
      'Oxidative stress and reactive oxygen species accumulation within melanocytic units',
      'Complex polygenic susceptibility interacting with environmental triggers'
    ],
    risk_factors: [
      'Personal or familial history of autoimmune diseases (Hashimoto thyroiditis, type 1 diabetes)',
      'Physical cutaneous trauma or repetitive friction (Koebner phenomenon)'
    ],
    prevention: [
      'Aggressive broad-spectrum sunscreen application (SPF 50+) on depigmented patches to prevent burns',
      'Minimizing physical friction and minor skin abrasions to avoid koebnerization',
      'Wearing UV-protective apparel during peak daylight hours'
    ],
    general_management: [
      'Topical corticosteroids or topical calcineurin inhibitors under dermatological supervision',
      'Targeted narrow-band UVB (NB-UVB) phototherapy to stimulate follicular melanocyte migration',
      'Cosmetic camouflage creams and self-tanning agents for aesthetic balance',
      'Regular evaluation for associated autoimmune thyroid dysfunction'
    ],
    when_to_seek_care: [
      'Rapidly spreading or newly appearing depigmented patches',
      'Depigmentation involves facial or genital skin causing emotional or psychological distress',
      'Sunburns or blistering occur within depigmented areas'
    ],
    warning_signs: [
      'Blistering burns on unpigmented skin after sun exposure',
      'Concurrent development of severe systemic fatigue, heat/cold intolerance, or joint swelling'
    ],
    sources: [
      'Vitiligo Global Issues Consensus Conference (VGICC)',
      'British Association of Dermatologists Guidelines for the Management of Vitiligo'
    ]
  },
  {
    id: 'folliculitis',
    name: 'Folliculitis',
    slug: 'folliculitis',
    category: 'Follicular Infection / Inflammation',
    typicalSeverity: 'Low',
    description:
      'Folliculitis is an inflammatory condition of one or more hair follicles, commonly manifesting as small erythematous papules or pustules pierced by a central hair shaft. It is frequently triggered by bacterial infection (most often Staphylococcus aureus), yeasts, or friction.',
    symptoms: [
      'Clusters of small, erythematous papules or pustules surrounding hair follicles',
      'Central hair shaft visible emerging from the apex of the lesion',
      'Mild localized tenderness, stinging, or pruritus',
      'Crusting upon rupture of pustular domes'
    ],
    causes: [
      'Bacterial proliferation, predominantly Staphylococcus aureus',
      'Fungal/yeast overgrowth, such as Malassezia species (Pityrosporum folliculitis)',
      'Mechanical friction from tight garments, athletic gear, or close shaving',
      'Occlusion from heavy oils, waxes, or unchlorinated hot tubs (Pseudomonas folliculitis)'
    ],
    risk_factors: [
      'Frequent shaving against the grain of hair growth or using dull razor blades',
      'Regular use of heated whirlpools or public swimming spas',
      'Excessive sweating in non-breathable synthetic clothing',
      'Underlying metabolic conditions such as diabetes mellitus'
    ],
    prevention: [
      'Always shave in the direction of hair growth using a sharp, clean razor blade',
      'Cleanse skin thoroughly with gentle syndet wash after heavy workouts or perspiration',
      'Avoid tight-fitting athletic gear that traps sweat against follicular openings',
      'Sanitize personal towels and change washcloths frequently'
    ],
    general_management: [
      'Warm saline compresses applied for 15 minutes three to four times daily to promote drainage',
      'Antibacterial cleansers containing benzoyl peroxide (4%-5%) or chlorhexidine',
      'Temporarily suspend shaving the affected region until lesions completely resolve',
      'Consultation with a clinician for prescription topical or oral antibiotics if spreading'
    ],
    when_to_seek_care: [
      'Lesions enlarge into deep, fluctuant, painful boils (furuncles or carbuncles)',
      'Redness spreads rapidly beyond the follicular units with localized warmth',
      'Fever, chills, or regional lymphadenopathy develops'
    ],
    warning_signs: [
      'Deepening cellulitis or fever requiring urgent clinical antimicrobial management',
      'Recurrent outbreaks unresponsive to standard over-the-counter hygiene measures'
    ],
    sources: [
      'Centers for Disease Control and Prevention (CDC) Cutaneous Infection Protocols',
      'American Academy of Dermatology (AAD) Folliculitis Management'
    ]
  }
];

export function getDiseaseById(id: string): DiseaseInfo | undefined {
  return DISEASES_DATABASE.find(
    (d) => d.id.toLowerCase() === id.toLowerCase() || d.slug.toLowerCase() === id.toLowerCase()
  );
}

/**
 * Enhanced matching algorithm with alias resolution
 */
export function findMatchingDisease(name: string): DiseaseInfo | undefined {
  if (!name || typeof name !== 'string') return undefined;
  const clean = name.toLowerCase().trim();

  // 1. Direct match by id or slug
  const directMatch = DISEASES_DATABASE.find(
    (d) => d.id.toLowerCase() === clean || d.slug.toLowerCase() === clean
  );
  if (directMatch) return directMatch;

  // 2. Substring match against full name or id
  const nameSubMatch = DISEASES_DATABASE.find(
    (d) => d.name.toLowerCase().includes(clean) || clean.includes(d.name.toLowerCase())
  );
  if (nameSubMatch) return nameSubMatch;

  // 3. Synonym and clinical keyword mapping
  if (/acne|pimple|comedo|blackhead|whitehead|zits|breakout|cystic acne/i.test(clean)) {
    return getDiseaseById('acne-vulgaris');
  }
  if (/psoriasis|plaque|scaly plaque|micaceous/i.test(clean)) {
    return getDiseaseById('plaque-psoriasis');
  }
  if (/eczema|atopic|atopic dermatitis|neurodermatitis|flexural dermatitis/i.test(clean)) {
    return getDiseaseById('atopic-dermatitis');
  }
  if (/contact derm|allergic contact|irritant contact|nickel allergy|poison ivy/i.test(clean)) {
    return getDiseaseById('contact-dermatitis');
  }
  if (/mole|nevus|nevi|melanocytic|pigmented macule|beauty mark/i.test(clean)) {
    return getDiseaseById('melanocytic-nevus');
  }
  if (/seborrheic keratosis|barnacle|seborrheic wart|stuck-on/i.test(clean)) {
    return getDiseaseById('seborrheic-keratosis');
  }
  if (/tinea|ringworm|fungal|mycosis|tinea corporis|tinea cruris|athlete/i.test(clean)) {
    return getDiseaseById('tinea-corporis');
  }
  if (/rosacea|facial flushing|erythematotelangiectatic|rhinophyma/i.test(clean)) {
    return getDiseaseById('rosacea');
  }
  if (/urticaria|hives|wheals|nettle rash|angioedema/i.test(clean)) {
    return getDiseaseById('urticaria');
  }
  if (/vitiligo|depigment|leukoderma|loss of pigment/i.test(clean)) {
    return getDiseaseById('vitiligo');
  }
  if (/folliculitis|hair follicle|razor bump|pityrosporum/i.test(clean)) {
    return getDiseaseById('folliculitis');
  }

  return undefined;
}

/**
 * Dynamically builds a medical-grade DiseaseInfo object for any condition detected by AI
 * Ensures the user NEVER gets an artificial Eczema fallback when another condition is detected.
 */
export function buildDynamicDiseaseInfo(
  conditionName: string,
  category?: string,
  partial?: Partial<DiseaseInfo>
): DiseaseInfo {
  const existing = findMatchingDisease(conditionName);
  if (existing) {
    return {
      ...existing,
      ...(partial || {})
    };
  }

  const slug = conditionName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'condition';
  const inferredCategory = category || 'Dermatological Presentation';

  return {
    id: slug,
    name: conditionName,
    slug: slug,
    category: inferredCategory,
    typicalSeverity: partial?.typicalSeverity || 'Moderate',
    description:
      partial?.description ||
      `${conditionName} is a dermatological cutaneous presentation characterized by localized epidermal or dermal morphological changes. Clinical evaluation by a board-certified dermatologist is recommended to determine an accurate diagnosis and customized management approach.`,
    symptoms:
      partial?.symptoms && partial.symptoms.length > 0
        ? partial.symptoms
        : [
            `Characteristic visual changes and localized skin surface alterations consistent with ${conditionName}`,
            'Potential localized sensations such as mild itching, sensitivity, or tenderness',
            'Noticeable variation in surface texture or color compared to adjacent unaffected skin'
          ],
    causes:
      partial?.causes && partial.causes.length > 0
        ? partial.causes
        : [
            'Complex interplay of cutaneous barrier factors, environmental triggers, or immune response',
            'Possible microbial, physical, or inflammatory interactions affecting the skin structure',
            'Individual genetic predispositions or external contact exposures'
          ],
    risk_factors:
      partial?.risk_factors && partial.risk_factors.length > 0
        ? partial.risk_factors
        : [
            'Environmental exposures, climatic variations, or direct contact irritants',
            'Prior history of cutaneous sensitivity or related dermatological symptoms',
            'Friction, mechanical stress, or compromised epidermal moisture barrier'
          ],
    prevention:
      partial?.prevention && partial.prevention.length > 0
        ? partial.prevention
        : [
            'Maintain gentle skin cleansing with fragrance-free, neutral pH formulations',
            'Protect the affected area from harsh friction, scratching, or excessive thermal exposure',
            'Apply broad-spectrum sun protection daily on exposed cutaneous surfaces'
          ],
    general_management:
      partial?.general_management && partial.general_management.length > 0
        ? partial.general_management
        : [
            'Keep the area clean, dry, and shielded from unnecessary mechanical abrasion',
            'Avoid attempting self-excision, aggressive scratching, or unprescribed caustic remedies',
            'Consult with a qualified healthcare professional or dermatologist for personalized clinical guidance'
          ],
    when_to_seek_care:
      partial?.when_to_seek_care && partial.when_to_seek_care.length > 0
        ? partial.when_to_seek_care
        : [
            'The lesion rapidly changes in size, border symmetry, color, or elevation',
            'Persistent pain, ulceration, bleeding, or signs of secondary infection occur',
            'Symptoms cause ongoing discomfort or do not improve over standard observation periods'
          ],
    warning_signs:
      partial?.warning_signs && partial.warning_signs.length > 0
        ? partial.warning_signs
        : [
            'Rapidly spreading surrounding erythema with localized warmth, severe pain, or fever',
            'Ulceration that fails to heal or exhibits persistent spontaneous hemorrhage'
          ],
    sources: [
      'American Academy of Dermatology (AAD) Clinical Knowledge Base',
      'DermNet NZ Dermatological Resource Library',
      'World Health Organization (WHO) Global Skin Health Initiative'
    ]
  };
}
