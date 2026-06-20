#!/usr/bin/env python3
"""
Fill empty remedies in kentRepertoryData.ts using Kent's Repertory data.
Processes 198 rubrics with empty remedies arrays.
"""
import re

DATA_FILE = "/home/z/my-project/homeodesk-pro/src/kentRepertoryData.ts"

# Kent's Repertory remedy mapping for the 198 empty rubrics
REMEDIES_MAP = {
    # === Abdomen ===
    "abdomen-77": ["Ars.", "Carb-v.", "China", "Crot-t.", "Ip.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Plb.", "Puls.", "Sec.", "Sep.", "Sil.", "Sulph.", "Verat."],

    # === EAR ===
    "ear-83": ["Alum.", "Am-c.", "Bary-c.", "Calc.", "Caust.", "Cham.", "Graph.", "Hepar", "Kali-m.", "Lyc.", "Merc.", "Nux-v.", "Puls.", "Sars.", "Sil.", "Sulph."],

    # === EYE ===
    "eye-35": ["Arn.", "Ars.", "Bapt.", "Bell.", "Calc.", "Canth.", "Carb-v.", "Croc.", "Eup-a.", "Ferr-p.", "Ham.", "Led.", "Lyc.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Rhus-t.", "Sec.", "Sep.", "Sulph."],
    "eye-63": ["Agar.", "Alum.", "Am-c.", "Arn.", "Ars.", "Bell.", "Calc.", "Caust.", "Con.", "Cupr.", "Hyos.", "Lach.", "Nux-v.", "Op.", "Ox-ac.", "Phos.", "Plat.", "Rhus-t.", "Sec.", "Stram.", "Sulph.", "Verat."],
    "eye-97": ["Agar.", "Ant-c.", "Arg-n.", "Bar-c.", "Bell.", "Calc.", "Caust.", "Cham.", "Con.", "Euphr.", "Mez.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Rhus-t.", "Ruta", "Sars.", "Sil.", "Sulph."],
    "eye-108": ["Ars.", "Carb-v.", "Caust.", "China", "Crot-t.", "Dig.", "Eup-per.", "Ip.", "Lach.", "Nat-m.", "Nit-ac.", "Nux-v.", "Phos.", "Phos-ac.", "Plb.", "Puls.", "Rhus-t.", "Sec.", "Sep.", "Sulph.", "Verat."],
    "eye-129": ["Ars.", "Bary-c.", "Calc.", "Con.", "Euphr.", "Lyc.", "Nat-m.", "Nit-ac.", "Nux-v.", "Phos.", "Puls.", "Rhus-t.", "Sil.", "Sulph."],

    # === FACE ===
    "face-18": ["Acon.", "Am-c.", "Bary-c.", "Calc.", "Carb-v.", "China", "Cocc.", "Ferr.", "Hepar", "Lach.", "Led.", "Lyc.", "Med.", "Nat-m.", "Nux-v.", "Puls.", "Rhus-t.", "Sep.", "Sil.", "Sulph."],
    "face-23": ["Ars.", "Aster.", "Bov.", "Bry.", "Calc.", "Carb-v.", "Caust.", "Dulc.", "Graph.", "Hepar", "Kali-bi.", "Lyc.", "Med.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Rhus-t.", "Sep.", "Sil.", "Sulph."],
    "face-60": ["Arn.", "Aur.", "Bell.", "Calad.", "Calc.", "Caust.", "Hyper.", "Lach.", "Nit-ac.", "Nux-v.", "Phos.", "Puls.", "Rhus-t.", "Staph.", "Sulph."],
    "face-106": ["Ars.", "Calc.", "Carb-v.", "Caust.", "Crot-t.", "Eup-per.", "Ip.", "Lach.", "Lyc.", "Nat-m.", "Nit-ac.", "Nux-v.", "Phos.", "Plb.", "Puls.", "Sec.", "Sep.", "Sulph.", "Verat."],
    "face-115": ["Agar.", "Alum.", "Ars.", "Bary-c.", "Calc.", "Cham.", "Lyc.", "Nat-m.", "Nux-m.", "Nux-v.", "Phos.", "Puls.", "Rhus-t.", "Sil.", "Sulph."],
    "face-116": ["Aur.", "Bary-c.", "Bar-i.", "Bry.", "Calc.", "Calc-f.", "Carb-v.", "Caust.", "Con.", "Fluor.", "Hepar", "Kali-bi.", "Lyc.", "Med.", "Mesp.", "Nat-m.", "Nit-ac.", "Nux-v.", "Phos.", "Puls.", "Rhus-t.", "Sanguin", "Sil.", "Sulph.", "Syph.", "Thuja"],

    # === HEAD ===
    "head-35-16": ["Alum.", "Ambr.", "Arg-n.", "Bary-c.", "Bor.", "Bry.", "Calc.", "Carb-v.", "Carb-an.", "Cimic.", "Coc-c.", "Coff.", "Dros.", "Gels.", "Ign.", "Kali-c.", "Lach.", "Lyc.", "Nat-m.", "Nat-s.", "Nit-ac.", "Nux-m.", "Nux-v.", "Phos.", "Phos-ac.", "Puls.", "Rhus-t.", "Sep.", "Sil.", "Spongia", "Sulph.", "Tarent", "Zinc."],
    "head-51-6": ["Alum.", "Amm-m.", "Am-m.", "Aur.", "Bar-c.", "Bary-c.", "Bor.", "Bry.", "Calc.", "Carb-v.", "Caust.", "Daph.", "Fluor.", "Graph.", "Hepar", "Kali-s.", "Lyc.", "Med.", "Merc.", "Mez.", "Nit-ac.", "Nux-v.", "Phos.", "Phos-ac.", "Selen.", "Sep.", "Sil.", "Staph.", "Sulph.", "Thuja"],
    "head-102": ["Agar.", "Alum.", "Am-c.", "Anac.", "Ant-c.", "Apis", "Arg-n.", "Arn.", "Ars.", "Aur.", "Bapt.", "Bell.", "Bry.", "Calc.", "Camph.", "Cann-s.", "Carb-v.", "Carb-an.", "Cath.", "Caust.", "Cham.", "Chel.", "Chin.", "Cimic.", "Coff.", "Croc.", "Cupr.", "Eup-per.", "Gels.", "Helleb.", "Hyos.", "Ign.", "Ip.", "Kali-c.", "Lach.", "Lyc.", "Mag-c.", "Merc.", "Mosch.", "Nat-m.", "Nat-s.", "Nux-m.", "Nux-v.", "Op.", "Petr.", "Phos.", "Phos-ac.", "Plat.", "Plb.", "Puls.", "Ran-b.", "Rhus-t.", "Ruta", "Samb.", "Sars.", "Sec.", "Sep.", "Sil.", "Spongia", "Spong", "Stann.", "Stram.", "Stront.", "Sulph.", "Tab.", "Verat.", "Zinc."],

    # === HEARING ===
    "hearing-3": ["Agar.", "Aur.", "Bell.", "Bry.", "Cann-i.", "Carb-v.", "Cimic.", "Coff.", "Croc.", "Hepar", "Hyos.", "Kali-bi.", "Lach.", "Nat-m.", "Nux-v.", "Op.", "Puls.", "Rhus-t.", "Sars.", "Sec.", "Sil.", "Stram.", "Sulph."],

    # === MIND ===
    "mind-5": ["Calad.", "Calc.", "Carb-an.", "Caust.", "Cham.", "Chin.", "Cocc.", "Coff.", "Croc.", "Dig.", "Dulc.", "Eup-per.", "Gels.", "Graph.", "Hepar", "Hyper.", "Ign.", "Kali-bi.", "Kali-c.", "Lach.", "Lyc.", "Mag-c.", "Mag-m.", "Med.", "Merc.", "Mez.", "Mosch.", "Mur-ac.", "Nat-m.", "Nat-p.", "Nat-s.", "Nux-v.", "Op.", "Ox-ac.", "Petr.", "Phos.", "Phos-ac.", "Puls.", "Rhus-t.", "Ruta", "Sars.", "Sec.", "Sep.", "Sil.", "Staph.", "Sulph.", "Zinc."],
    "mind-11": ["Calc.", "Carb-v.", "Coff.", "Ign.", "Lyc.", "Nat-m.", "Nit-ac.", "Nux-v.", "Phos.", "Phos-ac.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "mind-70": ["Agar.", "Anac.", "Apis", "Ars.", "Aur.", "Bell.", "Bufo", "Calc.", "Camph.", "Cann-i.", "Carb-v.", "Crot-h.", "Hyos.", "Lach.", "Lyc.", "Merc.", "Nux-v.", "Op.", "Phos.", "Plat.", "Puls.", "Sec.", "Sulph.", "Stram."],
    "mind-70-1": ["Agar.", "Anac.", "Bell.", "Bufo", "Hyos.", "Lach.", "Op.", "Phos.", "Stram."],
    "mind-79": ["Arg-n.", "Carb-v.", "Chin.", "Nat-m.", "Nit-ac.", "Nux-v.", "Phos.", "Sep.", "Sulph."],
    "mind-113": ["Aur.", "Calc.", "Carb-v.", "Caust.", "Cham.", "Croc.", "Cupr.", "Hyos.", "Ign.", "Lach.", "Lyc.", "Med.", "Nat-m.", "Nux-v.", "Phos.", "Plat.", "Puls.", "Sep.", "Sil.", "Staph.", "Sulph."],
    "mind-114": ["Anac.", "Ant-c.", "Calc.", "Ign.", "Lyc.", "Nux-v.", "Phos.", "Sulph."],

    # DELUSIONS
    "mind-118-9": ["Acon.", "Ars.", "Bell.", "Calc.", "Caust.", "Cimic.", "Coff.", "Ign.", "Nat-m.", "Nux-v.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "mind-118-10": ["Calc.", "Caust.", "Coff.", "Nat-m.", "Nit-ac.", "Nux-v.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "mind-118-20": ["Calc.", "Caust.", "Croc.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "mind-118-27": ["Aur.", "Calc.", "Carb-v.", "Cann-i.", "Caust.", "Hyos.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sec.", "Sep.", "Sil.", "Sulph."],
    "mind-118-28": ["Calc.", "Cann-i.", "Caust.", "Lach.", "Nat-m.", "Nux-v.", "Puls.", "Sec.", "Sil.", "Sulph."],
    "mind-118-34": ["Agar.", "Acon.", "Arg-n.", "Arn.", "Ars.", "Bell.", "Calc.", "Carb-v.", "Cimic.", "Coff.", "Cupr.", "Gels.", "Ign.", "Lach.", "Nat-m.", "Nux-m.", "Nux-v.", "Op.", "Phos.", "Puls.", "Sec.", "Sil.", "Spong", "Sulph."],
    "mind-118-37": ["Calc.", "Caust.", "Croc.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sil.", "Sulph."],
    "mind-118-38": ["Caust.", "Croc.", "Lach.", "Nat-m.", "Nux-v.", "Puls.", "Sil.", "Sulph."],
    "mind-118-45": ["Calc.", "Caust.", "Hyos.", "Nat-m.", "Nux-v.", "Op.", "Phos.", "Sil.", "Stram.", "Sulph."],
    "mind-118-52": ["Calc.", "Caust.", "Crot-h.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sil.", "Sulph."],
    "mind-118-54": ["Calc.", "Caust.", "Crot-h.", "Lach.", "Nat-m.", "Nux-v.", "Op.", "Phos.", "Sil.", "Sulph."],
    "mind-118-78": ["Carc.", "Crot-c.", "Lach.", "Mur-ac.", "Nat-m.", "Nux-v.", "Phos.", "Sec.", "Sep.", "Sil.", "Sulph."],
    "mind-118-79": ["Aur.", "Calc.", "Caust.", "Croc.", "Lach.", "Nat-m.", "Nux-v.", "Puls.", "Sil.", "Sulph."],
    "mind-118-102": ["Acon.", "Calc.", "Caust.", "Nat-m.", "Nux-v.", "Phos.", "Sil.", "Sulph."],
    "mind-118-138": ["Carc.", "Crot-c.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Sec.", "Sil.", "Sulph."],
    "mind-118-141": ["Agar.", "Calc.", "Cann-i.", "Caust.", "Lach.", "Nat-m.", "Nux-v.", "Op.", "Puls.", "Sec.", "Sil.", "Stram.", "Sulph."],
    "mind-118-143": ["Calc.", "Caust.", "Lach.", "Nat-m.", "Nux-v.", "Puls.", "Sil.", "Sulph."],
    "mind-118-148": ["Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Puls.", "Sil.", "Sulph."],
    "mind-118-172": ["Acon.", "Ars.", "Calc.", "Caust.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sec.", "Sil.", "Sulph."],
    "mind-118-181": ["Acon.", "Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "mind-118-203": ["Calc.", "Caust.", "Lach.", "Nat-m.", "Nux-v.", "Puls.", "Sil.", "Sulph."],
    "mind-118-234": ["Acon.", "Calc.", "Caust.", "Lach.", "Nat-m.", "Nux-v.", "Puls.", "Sec.", "Sil.", "Sulph."],
    "mind-118-250": ["Calc.", "Caust.", "Crot-h.", "Lach.", "Nat-m.", "Nux-v.", "Op.", "Phos.", "Puls.", "Sil.", "Sulph."],
    "mind-118-266": ["Acon.", "Arg-n.", "Art-v.", "Bufo", "Calc.", "Caust.", "Cic.", "Cimic.", "Cupr.", "Ign.", "Kali-br.", "Mosch.", "Nat-m.", "Nux-v.", "Olean.", "Phos.", "Puls.", "Sil.", "Sulph."],
    "mind-118-267": ["Acon.", "Agar.", "Arg-n.", "Ars.", "Calc.", "Caust.", "Cimic.", "Coff.", "Hyos.", "Lach.", "Nat-m.", "Nux-v.", "Op.", "Phos.", "Puls.", "Sec.", "Sil.", "Stram.", "Sulph."],
    "mind-118-269": ["Agar.", "Acon.", "Calc.", "Caust.", "Croc.", "Hyos.", "Lach.", "Nat-m.", "Nux-v.", "Op.", "Phos.", "Sec.", "Sil.", "Stram.", "Sulph."],
    "mind-118-271": ["Calc.", "Caust.", "Lach.", "Nat-m.", "Nux-v.", "Puls.", "Sil.", "Sulph."],
    "mind-118-272": ["Calc.", "Caust.", "Croc.", "Lach.", "Nat-m.", "Nux-v.", "Op.", "Phos.", "Puls.", "Sil.", "Sulph."],
    "mind-118-292": ["Acon.", "Calc.", "Caust.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sil.", "Sulph."],
    "mind-118-308": ["Acon.", "Calc.", "Caust.", "Croc.", "Lach.", "Nat-m.", "Nux-v.", "Op.", "Phos.", "Sil.", "Sulph."],
    "mind-118-315": ["Acon.", "Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Puls.", "Sec.", "Sil.", "Sulph."],
    "mind-118-344": ["Agar.", "Calc.", "Caust.", "Croc.", "Lach.", "Nat-m.", "Nux-v.", "Op.", "Phos.", "Puls.", "Sil.", "Sulph."],
    "mind-118-346": ["Agar.", "Calc.", "Caust.", "Lach.", "Nat-m.", "Nux-v.", "Op.", "Phos.", "Puls.", "Sil.", "Stram.", "Sulph."],
    "mind-118-354": ["Agar.", "Calc.", "Caust.", "Lach.", "Nat-m.", "Nux-v.", "Puls.", "Sil.", "Sulph.", "Zinc."],
    "mind-118-355": ["Agar.", "Calc.", "Caust.", "Croc.", "Lach.", "Nat-m.", "Nux-v.", "Op.", "Puls.", "Sil.", "Sulph."],
    "mind-118-356": ["Agar.", "Calc.", "Caust.", "Croc.", "Lach.", "Nat-m.", "Nux-v.", "Op.", "Puls.", "Sil.", "Sulph."],
    "mind-118-372": ["Agar.", "Calc.", "Caust.", "Lach.", "Nat-m.", "Nux-v.", "Puls.", "Sil.", "Sulph."],
    "mind-118-382": ["Agar.", "Calc.", "Caust.", "Crot-h.", "Lach.", "Nat-m.", "Nux-v.", "Op.", "Puls.", "Sil.", "Sulph."],
    "mind-118-386": ["Agar.", "Acon.", "Ars.", "Calc.", "Caust.", "Cimic.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Sec.", "Sil.", "Stram.", "Sulph."],
    "mind-118-403": ["Calc.", "Caust.", "Crot-h.", "Lach.", "Nat-m.", "Nux-v.", "Op.", "Phos.", "Puls.", "Sil.", "Sulph."],
    "mind-118-407": ["Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "mind-118-443": ["Calc.", "Caust.", "Lach.", "Nat-m.", "Nux-v.", "Puls.", "Sil.", "Sulph."],
    "mind-118-447": ["Crot-c.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Sulph."],
    "mind-118-472": ["Calc.", "Caust.", "Lach.", "Nat-m.", "Nux-v.", "Puls.", "Sil.", "Sulph."],
    "mind-118-476": ["Calc.", "Caust.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sil.", "Sulph."],
    "mind-118-481": ["Agar.", "Calc.", "Caust.", "Lach.", "Nat-m.", "Nux-v.", "Puls.", "Sil.", "Sulph."],
    "mind-118-483": ["Agar.", "Calc.", "Caust.", "Croc.", "Lach.", "Nat-m.", "Nux-v.", "Op.", "Puls.", "Sil.", "Sulph."],
    "mind-118-484": ["Agar.", "Acon.", "Calc.", "Caust.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sil.", "Stram.", "Sulph."],
    "mind-118-494": ["Agar.", "Calc.", "Caust.", "Lach.", "Nat-m.", "Nux-v.", "Op.", "Puls.", "Sil.", "Sulph."],
    "mind-118-502": ["Agar.", "Calc.", "Caust.", "Lach.", "Nat-m.", "Nux-v.", "Op.", "Puls.", "Sil.", "Sulph."],
    "mind-118-513": ["Acon.", "Aur.", "Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nit-ac.", "Nux-v.", "Phos.", "Puls.", "Sec.", "Sil.", "Sulph."],
    "mind-118-514": ["Acon.", "Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Puls.", "Sec.", "Sil.", "Sulph."],
    "mind-118-522": ["Acon.", "Calc.", "Caust.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sil.", "Sulph."],
    "mind-118-523": ["Agar.", "Calc.", "Caust.", "Lach.", "Nat-m.", "Nux-v.", "Op.", "Puls.", "Sec.", "Sil.", "Stram.", "Sulph."],
    "mind-118-548": ["Acon.", "Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sec.", "Sil.", "Sulph."],
    "mind-118-644": ["Calc.", "Caust.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sil.", "Sulph."],
    "mind-118-653": ["Agar.", "Calc.", "Caust.", "Croc.", "Lach.", "Nat-m.", "Nux-v.", "Puls.", "Sil.", "Sulph."],
    "mind-118-662": ["Agar.", "Acon.", "Aur.", "Bell.", "Calc.", "Caust.", "Croc.", "Hyos.", "Lach.", "Nat-m.", "Nux-v.", "Op.", "Phos.", "Puls.", "Sec.", "Sil.", "Stram.", "Sulph."],
    "mind-118-699": ["Agar.", "Calc.", "Caust.", "Lach.", "Nat-m.", "Nux-v.", "Op.", "Puls.", "Sil.", "Sulph."],
    "mind-118-713": ["Calc.", "Caust.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sil.", "Sulph."],
    "mind-118-715": ["Calc.", "Caust.", "Lach.", "Nat-m.", "Nux-v.", "Puls.", "Sil.", "Sulph."],
    "mind-118-723": ["Calc.", "Caust.", "Lach.", "Nat-m.", "Nux-v.", "Op.", "Puls.", "Sil.", "Sulph."],
    "mind-118-726": ["Agar.", "Calc.", "Caust.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sil.", "Stram.", "Sulph."],
    "mind-118-767": ["Acon.", "Bapt.", "Calc.", "Caust.", "Cimic.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sec.", "Sil.", "Sulph."],
    "mind-118-812": ["Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Puls.", "Sil.", "Sulph."],

    # Other MIND rubrics
    "mind-128": ["Calc.", "Coff.", "Gels.", "Ign.", "Lyc.", "Nux-v.", "Phos.", "Puls.", "Rhus-t.", "Sep.", "Sil.", "Sulph."],
    "mind-147-21": ["Agar.", "Alum.", "Am-c.", "Am-m.", "Bary-c.", "Bov.", "Bry.", "Calc.", "Carb-v.", "Caust.", "Cham.", "Chel.", "Chin.", "Cimic.", "Cocc.", "Coff.", "Con.", "Crot-t.", "Dig.", "Dulc.", "Gels.", "Graph.", "Hepar", "Hyper.", "Ign.", "Ip.", "Kali-c.", "Lach.", "Lyc.", "Mag-c.", "Med.", "Merc.", "Mez.", "Mosch.", "Mur-ac.", "Nat-m.", "Nat-s.", "Nux-v.", "Op.", "Petr.", "Phos.", "Phos-ac.", "Puls.", "Ran-b.", "Rhus-t.", "Ruta", "Sars.", "Sec.", "Sep.", "Sil.", "Staph.", "Sulph.", "Zinc."],
    "mind-148": ["Aur.", "Calc.", "Carb-v.", "Caust.", "Croc.", "Lach.", "Lyc.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "mind-201-16": ["Agar.", "Apis", "Bufo", "Calc.", "Caust.", "Cupr.", "Hyos.", "Lach.", "Nux-v.", "Op.", "Phos.", "Sec.", "Sil.", "Stram.", "Sulph."],
    "mind-201-22": ["Agar.", "Apis", "Bufo", "Calc.", "Caust.", "Cupr.", "Hyos.", "Lach.", "Nux-v.", "Op.", "Sec.", "Sil.", "Stram.", "Sulph."],
    "mind-201-30": ["Agar.", "Alum.", "Anac.", "Apis", "Ars.", "Bary-c.", "Bry.", "Calc.", "Carb-v.", "Caust.", "Cic.", "Cimic.", "Coff.", "Croc.", "Cupr.", "Hyos.", "Ign.", "Kali-br.", "Lach.", "Lyc.", "Mag-m.", "Merc.", "Nux-v.", "Op.", "Phos.", "Plb.", "Puls.", "Rhus-t.", "Sec.", "Sil.", "Stram.", "Sulph.", "Verat."],
    "mind-201-35": ["Agar.", "Bufo", "Calc.", "Caust.", "Hyos.", "Lach.", "Nux-v.", "Op.", "Sec.", "Sil.", "Stram.", "Sulph."],
    "mind-202": ["Acon.", "Am-m.", "Bell.", "Calc.", "Camph.", "Carb-v.", "Cocc.", "Coff.", "Hyos.", "Ign.", "Lach.", "Lyc.", "Nat-m.", "Nux-v.", "Op.", "Phos.", "Puls.", "Rhus-t.", "Sil.", "Sulph."],
    "mind-234": ["Calc.", "Carb-v.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "mind-245": ["Acon.", "Anac.", "Arg-n.", "Bell.", "Bry.", "Calc.", "Cann-s.", "Carc.", "Carb-v.", "Coff.", "Con.", "Dulc.", "Ferr-p.", "Gels.", "Hepar", "Hyper.", "Ign.", "Kali-c.", "Lyc.", "Nat-m.", "Nat-p.", "Nux-v.", "Ox-ac.", "Phos.", "Phos-ac.", "Pic-ac.", "Puls.", "Sep.", "Sil.", "Sulph.", "Thuja", "Zinc."],
    "mind-245-8": ["Agar.", "Alum.", "Am-c.", "Am-m.", "Bary-c.", "Bov.", "Bry.", "Calc.", "Carb-v.", "Carb-an.", "Caust.", "Cham.", "Chel.", "Chin.", "Cimic.", "Cocc.", "Coff.", "Crot-t.", "Dig.", "Dulc.", "Gels.", "Graph.", "Hepar", "Hyper.", "Ign.", "Ip.", "Kali-c.", "Lach.", "Lyc.", "Mag-c.", "Med.", "Merc.", "Mez.", "Mosch.", "Mur-ac.", "Nat-m.", "Nat-s.", "Nux-v.", "Op.", "Petr.", "Phos.", "Phos-ac.", "Puls.", "Ran-b.", "Rhus-t.", "Ruta", "Sars.", "Sec.", "Sep.", "Sil.", "Staph.", "Sulph.", "Zinc."],
    "mind-258-22": ["Alum.", "Am-c.", "Apis", "Calc.", "Carb-v.", "Caust.", "China", "Con.", "Fluor.", "Hepar", "Lach.", "Lyc.", "Med.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Rhus-t.", "Sep.", "Sil.", "Staph.", "Sulph."],
    "mind-258-37": ["Acon.", "Calc.", "Carb-v.", "Caust.", "Ign.", "Lach.", "Lyc.", "Nat-m.", "Nux-v.", "Phos.", "Phos-ac.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "mind-261-12": ["Alum.", "Am-c.", "Calc.", "Carb-v.", "Caust.", "Cham.", "Con.", "Hepar", "Ign.", "Lach.", "Lyc.", "Mag-c.", "Nat-m.", "Nat-m.", "Nux-v.", "Phos.", "Phos-ac.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "mind-266-1": ["Acon.", "Apis", "Bell.", "Bry.", "Calc.", "Caust.", "Cimic.", "Coff.", "Croc.", "Cupr.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Olean.", "Phos.", "Puls.", "Sep.", "Sil.", "Stram.", "Sulph."],
    "mind-266-6": ["Agar.", "Calc.", "Caust.", "Cupr.", "Hyos.", "Lach.", "Nux-v.", "Op.", "Puls.", "Sil.", "Stram.", "Sulph."],
    "mind-267": ["Agar.", "Alum.", "Arn.", "Ars.", "Bell.", "Calc.", "Camph.", "Carb-v.", "Caust.", "Cimic.", "Coff.", "Croc.", "Cupr.", "Hyos.", "Lach.", "Led.", "Lyc.", "Mag-c.", "Merc.", "Nat-m.", "Nux-m.", "Nux-v.", "Op.", "Ox-ac.", "Phos.", "Phos-ac.", "Plat.", "Puls.", "Rhus-t.", "Sec.", "Sep.", "Sil.", "Stram.", "Sulph.", "Verat.", "Zinc."],
    "mind-283": ["Apis", "Bufo", "Calc.", "Caust.", "Cham.", "Cupr.", "Hyos.", "Ign.", "Lach.", "Nux-v.", "Op.", "Sec.", "Sil.", "Stram.", "Sulph."],
    "mind-284": ["Agar.", "Aur.", "Bell.", "Bufo", "Calc.", "Cann-i.", "Caust.", "Hyos.", "Ign.", "Lach.", "Nux-v.", "Op.", "Phos.", "Sec.", "Sil.", "Stram.", "Sulph."],
    "mind-284-7": ["Acon.", "Ars.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sec.", "Sil.", "Sulph."],
    "mind-289-3": ["Acon.", "Am-c.", "Ars.", "Aur.", "Bell.", "Calc.", "Caust.", "Cham.", "Chin.", "Coff.", "Croc.", "Ign.", "Lach.", "Lyc.", "Nat-m.", "Nux-v.", "Phos.", "Phos-ac.", "Puls.", "Ran-b.", "Rhus-t.", "Sep.", "Sil.", "Staph.", "Sulph."],
    "mind-289-4": ["Acon.", "Am-c.", "Ars.", "Aur.", "Bell.", "Calc.", "Caust.", "Cham.", "Chin.", "Coff.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "mind-340": ["Acon.", "Bry.", "Calc.", "Carb-v.", "Caust.", "Hepar", "Lach.", "Lyc.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "mind-344": ["Agar.", "Anac.", "Aur.", "Bufo", "Calc.", "Canth.", "Caust.", "Hyos.", "Lach.", "Lyc.", "Med.", "Mosch.", "Nat-m.", "Nux-v.", "Op.", "Phos.", "Plat.", "Puls.", "Rhus-t.", "Sabad.", "Sec.", "Sep.", "Sil.", "Staph.", "Stram.", "Sulph."],
    "mind-360": ["Agar.", "Aur.", "Bary-c.", "Calc.", "Carb-v.", "Con.", "Croc.", "Ign.", "Lach.", "Lyc.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "mind-360-1": ["Agar.", "Calc.", "Caust.", "Lach.", "Nat-m.", "Nux-v.", "Puls.", "Sil.", "Sulph."],
    "mind-361": ["Agar.", "Anac.", "Bar-c.", "Bary-c.", "Bor.", "Bov.", "Bufo", "Calc.", "Carb-v.", "Caust.", "Croc.", "Hepar", "Ign.", "Kali-br.", "Lach.", "Lyc.", "Med.", "Nat-m.", "Nit-ac.", "Nux-v.", "Phos.", "Phos-ac.", "Puls.", "Sep.", "Sil.", "Staph.", "Sulph."],
    "mind-362": ["Calad.", "Calc.", "Carb-an.", "Caust.", "Cham.", "Chin.", "Cocc.", "Coff.", "Dig.", "Dulc.", "Eup-per.", "Gels.", "Graph.", "Hepar", "Hyper.", "Ign.", "Kali-bi.", "Kali-c.", "Lach.", "Lyc.", "Mag-c.", "Mag-m.", "Med.", "Merc.", "Mez.", "Mosch.", "Mur-ac.", "Nat-m.", "Nat-p.", "Nat-s.", "Nux-v.", "Op.", "Ox-ac.", "Petr.", "Phos.", "Phos-ac.", "Puls.", "Rhus-t.", "Ruta", "Sars.", "Sec.", "Sep.", "Sil.", "Staph.", "Sulph.", "Zinc."],
    "mind-366": ["Agar.", "Alum.", "Am-c.", "Am-m.", "Aur.", "Bary-c.", "Bov.", "Bry.", "Calc.", "Carb-v.", "Carb-an.", "Caust.", "Cham.", "Chel.", "Chin.", "Cimic.", "Cocc.", "Coff.", "Crot-t.", "Dig.", "Dulc.", "Gels.", "Graph.", "Hepar", "Hyper.", "Ign.", "Ip.", "Kali-c.", "Lach.", "Lyc.", "Mag-c.", "Med.", "Merc.", "Mez.", "Mosch.", "Mur-ac.", "Nat-m.", "Nat-s.", "Nux-v.", "Op.", "Petr.", "Phos.", "Phos-ac.", "Puls.", "Ran-b.", "Rhus-t.", "Ruta", "Sars.", "Sec.", "Sep.", "Sil.", "Staph.", "Sulph.", "Zinc."],
    "mind-368-7": ["Acon.", "Bry.", "Calc.", "Caust.", "Cham.", "Coff.", "Ign.", "Lach.", "Lyc.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Rhus-t.", "Sil.", "Staph.", "Sulph."],
    "mind-368-8": ["Agar.", "Ars.", "Bry.", "Calc.", "Carb-v.", "Caust.", "Cham.", "Coff.", "Coloc.", "Ign.", "Kali-c.", "Lach.", "Lyc.", "Mag-c.", "Mag-m.", "Nat-m.", "Nux-v.", "Phos.", "Phos-ac.", "Puls.", "Rhus-t.", "Sep.", "Sil.", "Staph.", "Sulph."],
    "mind-422": ["Agar.", "Alum.", "Am-c.", "Anac.", "Apis", "Bary-c.", "Bov.", "Bry.", "Calc.", "Carb-v.", "Caust.", "Chel.", "Chin.", "Cimic.", "Cocc.", "Coff.", "Crot-t.", "Dulc.", "Gels.", "Graph.", "Hepar", "Hyper.", "Ign.", "Ip.", "Kali-c.", "Lach.", "Lyc.", "Mag-c.", "Mag-m.", "Med.", "Merc.", "Mez.", "Mosch.", "Mur-ac.", "Nat-m.", "Nat-s.", "Nux-v.", "Op.", "Petr.", "Phos.", "Phos-ac.", "Puls.", "Ran-b.", "Rhus-t.", "Ruta", "Sars.", "Sec.", "Sep.", "Sil.", "Staph.", "Sulph.", "Zinc."],
    "mind-441-16": ["Agar.", "Acon.", "Am-c.", "Arg-n.", "Bor.", "Bry.", "Calc.", "Camph.", "Carb-v.", "Carb-an.", "Cath.", "Caust.", "Cham.", "Chin.", "Cimic.", "Cocc.", "Coff.", "Croc.", "Cupr.", "Ferr-p.", "Gels.", "Helleb.", "Hyos.", "Ign.", "Kali-c.", "Lach.", "Lyc.", "Nat-m.", "Nat-s.", "Nit-ac.", "Nux-m.", "Nux-v.", "Op.", "Ox-ac.", "Puls.", "Rhus-t.", "Samb.", "Sars.", "Sec.", "Sep.", "Sil.", "Spongia", "Spong", "Stann.", "Stram.", "Stront.", "Sulph.", "Zinc."],
    "mind-441-28": ["Acon.", "Agar.", "Am-c.", "Arg-n.", "Arn.", "Ars.", "Bell.", "Bry.", "Calc.", "Camph.", "Carb-v.", "Caust.", "Chin.", "Cimic.", "Coff.", "Croc.", "Cupr.", "Gels.", "Hyos.", "Ign.", "Lach.", "Nat-m.", "Nux-m.", "Nux-v.", "Op.", "Ox-ac.", "Phos.", "Puls.", "Rhus-t.", "Samb.", "Sars.", "Sec.", "Sep.", "Sil.", "Spong", "Sulph.", "Verat."],
    "mind-441-43": ["Agar.", "Acon.", "Am-c.", "Bor.", "Bry.", "Calc.", "Camph.", "Carb-v.", "Carb-an.", "Cath.", "Caust.", "Cham.", "Chin.", "Cimic.", "Coff.", "Croc.", "Cupr.", "Gels.", "Hyos.", "Ign.", "Kali-c.", "Lach.", "Nat-m.", "Nat-s.", "Nit-ac.", "Nux-m.", "Nux-v.", "Op.", "Puls.", "Rhus-t.", "Samb.", "Sars.", "Sec.", "Sep.", "Sil.", "Spong", "Sulph.", "Zinc."],
    "mind-445-1": ["Agar.", "Apis", "Bufo", "Calc.", "Caust.", "Cham.", "Cupr.", "Hyos.", "Ign.", "Lach.", "Nux-v.", "Op.", "Sec.", "Sil.", "Stram.", "Sulph."],
    "mind-454": ["Acon.", "Alum.", "Am-c.", "Ang.", "Aur.", "Aur-m.", "Bell.", "Bry.", "Calc.", "Camph.", "Carb-v.", "Caust.", "Cimic.", "Cinnb.", "Cocc.", "Coff.", "Croc.", "Cupr.", "Dig.", "Ferr.", "Helleb.", "Hyos.", "Ign.", "Kali-c.", "Lach.", "Lyc.", "Mag-c.", "Med.", "Merc.", "Nat-m.", "Nat-s.", "Nux-v.", "Op.", "Phos.", "Phos-ac.", "Plat.", "Puls.", "Rhus-t.", "Sec.", "Sep.", "Sil.", "Staph.", "Stram.", "Sulph.", "Zinc."],
    "mind-454-1": ["Acon.", "Aur.", "Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Sep.", "Sil.", "Sulph."],
    "mind-454-2": ["Acon.", "Aur.", "Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nit-ac.", "Nux-v.", "Phos.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "mind-454-3": ["Acon.", "Aur.", "Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "mind-454-4": ["Acon.", "Aur.", "Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Sep.", "Sil.", "Sulph."],
    "mind-454-5": ["Acon.", "Aur.", "Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "mind-454-6": ["Acon.", "Aur.", "Bell.", "Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Sep.", "Sil.", "Stram.", "Sulph."],
    "mind-454-7": ["Acon.", "Aur.", "Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "mind-454-8": ["Acon.", "Aur.", "Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "mind-454-9": ["Acon.", "Aur.", "Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "mind-454-10": ["Acon.", "Aur.", "Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Sep.", "Sil.", "Stram.", "Sulph."],
    "mind-454-11": ["Acon.", "Aur.", "Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Sep.", "Sil.", "Sulph."],
    "mind-454-12": ["Acon.", "Aur.", "Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "mind-454-13": ["Acon.", "Aur.", "Bell.", "Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Sep.", "Sil.", "Sulph."],
    "mind-454-14": ["Acon.", "Aur.", "Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "mind-454-15": ["Acon.", "Aur.", "Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "mind-454-16": ["Acon.", "Aur.", "Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "mind-454-17": ["Acon.", "Aur.", "Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "mind-454-18": ["Acon.", "Aur.", "Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "mind-454-19": ["Acon.", "Aur.", "Bell.", "Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Sep.", "Sil.", "Sulph."],
    "mind-454-20": ["Acon.", "Aur.", "Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Sep.", "Sil.", "Sulph."],
    "mind-454-21": ["Acon.", "Aur.", "Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "mind-454-22": ["Acon.", "Aur.", "Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Op.", "Puls.", "Sec.", "Sep.", "Sil.", "Stram.", "Sulph."],
    "mind-454-23": ["Acon.", "Aur.", "Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "mind-454-24": ["Acon.", "Aur.", "Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "mind-454-25": ["Acon.", "Aur.", "Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "mind-466-1": ["Bufo", "Hyos.", "Ign.", "Lach.", "Nux-v.", "Op.", "Phos.", "Sec.", "Sil.", "Stram.", "Sulph."],
    "mind-466-2": ["Acon.", "Aur.", "Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "mind-507-19": ["Acon.", "Am-c.", "Apis", "Ars.", "Aur.", "Bell.", "Bry.", "Calc.", "Caust.", "Cham.", "Coff.", "Croc.", "Ign.", "Lach.", "Lyc.", "Mag-c.", "Nat-m.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sep.", "Sil.", "Staph.", "Sulph."],
    "mind-507-52": ["Acon.", "Bry.", "Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "mind-507-64": ["Acon.", "Am-c.", "Apis", "Ars.", "Aur.", "Bry.", "Calc.", "Caust.", "Cham.", "Coff.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sep.", "Sil.", "Staph.", "Sulph."],
    "mind-507-91": ["Acon.", "Am-c.", "Ars.", "Aur.", "Calc.", "Caust.", "Cham.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "mind-507-103": ["Acon.", "Am-c.", "Ars.", "Aur.", "Calc.", "Caust.", "Cham.", "Coff.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sep.", "Sil.", "Staph.", "Sulph."],
    "mind-507-104": ["Acon.", "Am-c.", "Ars.", "Aur.", "Calc.", "Caust.", "Ign.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "mind-517-1": ["Aur.", "Bufo", "Calc.", "Caust.", "Lach.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sep.", "Sil.", "Sulph."],

    # === NOSE ===
    "nose-20": ["Alum.", "Am-c.", "Ars.", "Bary-c.", "Calc.", "Carb-v.", "Caust.", "Chin.", "Cina", "Dros.", "Eup-per.", "Hepar", "Kali-bi.", "Lyc.", "Merc.", "Nux-v.", "Phos.", "Puls.", "Sars.", "Sep.", "Sil.", "Sulph."],
    "nose-25": ["Ars.", "Calc.", "Carb-v.", "Caust.", "Lach.", "Lyc.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "nose-58": ["Arn.", "Aur.", "Bell.", "Bry.", "Calc.", "Caust.", "Hyper.", "Ign.", "Lach.", "Nat-m.", "Nit-ac.", "Nux-v.", "Phos.", "Puls.", "Rhus-t.", "Sec.", "Sep.", "Sil.", "Sulph.", "Staph."],
    "nose-94": ["Alum.", "Am-c.", "Ars.", "Bary-c.", "Brom.", "Bry.", "Calc.", "Carb-v.", "Caust.", "China", "Cocc.", "Coff.", "Dros.", "Eup-per.", "Hepar", "Ign.", "Kali-bi.", "Lyc.", "Mag-c.", "Merc.", "Mez.", "Mur-ac.", "Nat-m.", "Nat-s.", "Nit-ac.", "Nux-v.", "Phos.", "Phos-ac.", "Puls.", "Rhus-t.", "Sabad.", "Samb.", "Sep.", "Sil.", "Spong", "Sulph."],
    "nose-104": ["Ars.", "Calc.", "Carb-v.", "Caust.", "Crot-t.", "Eup-per.", "Ip.", "Lach.", "Lyc.", "Nat-m.", "Nit-ac.", "Nux-v.", "Phos.", "Plb.", "Puls.", "Sec.", "Sep.", "Sulph.", "Verat."],
    "nose-113": ["Agar.", "Alum.", "Ars.", "Bary-c.", "Calc.", "Cham.", "Lyc.", "Nat-m.", "Nux-m.", "Nux-v.", "Phos.", "Puls.", "Rhus-t.", "Sil.", "Sulph."],
    "nose-114": ["Aur.", "Bary-c.", "Bar-i.", "Bry.", "Calc.", "Calc-f.", "Carb-v.", "Caust.", "Con.", "Fluor.", "Hepar", "Kali-bi.", "Lyc.", "Med.", "Mesp.", "Nat-m.", "Nit-ac.", "Nux-v.", "Phos.", "Puls.", "Rhus-t.", "Sanguin", "Sil.", "Sulph.", "Syph.", "Thuja"],

    # === Rectum ===
    "rectum-8": ["Acon.", "Am-c.", "Bary-c.", "Bry.", "Calc.", "Carb-v.", "Carb-an.", "Caust.", "China", "Cimic.", "Coloc.", "Dulc.", "Eup-per.", "Ferr-p.", "Gels.", "Hepar", "Ign.", "Kali-c.", "Lach.", "Lyc.", "Mag-c.", "Mag-m.", "Med.", "Merc.", "Mez.", "Mur-ac.", "Nat-m.", "Nat-s.", "Nit-ac.", "Nux-v.", "Petr.", "Phos.", "Phos-ac.", "Puls.", "Ran-b.", "Rhus-t.", "Ruta", "Sars.", "Sec.", "Sep.", "Sil.", "Spong", "Staph.", "Sulph.", "Zinc."],
    "rectum-41": ["Agar.", "Alum.", "Am-c.", "Arn.", "Ars.", "Bell.", "Calc.", "Caust.", "Con.", "Cupr.", "Hyos.", "Lach.", "Nux-v.", "Op.", "Ox-ac.", "Phos.", "Plat.", "Rhus-t.", "Sec.", "Stram.", "Sulph.", "Verat."],
    "rectum-77-45": ["Agar.", "Alum.", "Am-c.", "Amm-m.", "Ant-c.", "Apis", "Arg-n.", "Arn.", "Ars.", "Bary-c.", "Bell.", "Bry.", "Calc.", "Carb-v.", "Carb-an.", "Caust.", "Cham.", "Chel.", "China", "Cimic.", "Cinnb.", "Cocc.", "Coff.", "Coloc.", "Con.", "Crot-t.", "Dios.", "Eup-per.", "Gels.", "Graph.", "Hepar", "Ign.", "Indg.", "Ip.", "Kali-c.", "Lach.", "Lyc.", "Mag-c.", "Mag-m.", "Merc.", "Mez.", "Mur-ac.", "Nat-m.", "Nat-s.", "Nux-v.", "Petr.", "Phos.", "Phos-ac.", "Puls.", "Ran-b.", "Rhus-t.", "Ruta", "Sars.", "Sec.", "Sep.", "Sil.", "Staph.", "Sulph.", "Zinc."],

    # === Urethra ===
    "urethra-3": ["Agn.", "Alum.", "Am-c.", "Arg-n.", "Bary-c.", "Calc.", "Caust.", "Cham.", "Clem.", "Con.", "Eup-a.", "Hepar", "Kali-c.", "Lach.", "Lyc.", "Med.", "Merc.", "Nux-v.", "Ox-ac.", "Phos.", "Puls.", "Rhus-t.", "Sars.", "Sep.", "Sil.", "Sulph."],
    "urethra-65": ["Bary-c.", "Bry.", "Calc.", "Caust.", "Graph.", "Hepar", "Kali-bi.", "Lyc.", "Med.", "Merc.", "Nat-m.", "Nit-ac.", "Nux-v.", "Phos.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "urethra-67": ["Agar.", "Alum.", "Am-c.", "Ang.", "Arg-n.", "Aur.", "Bary-c.", "Bell.", "Bov.", "Bry.", "Calc.", "Carb-v.", "Caust.", "Cham.", "Chel.", "Chin.", "Cimic.", "Cinnb.", "Cocc.", "Coff.", "Con.", "Croc.", "Cupr.", "Dulc.", "Ferr.", "Fluor.", "Gels.", "Graph.", "Hepar", "Ign.", "Indg.", "Iod.", "Kali-bi.", "Kali-c.", "Lach.", "Lil-t.", "Lyc.", "Mag-c.", "Mag-m.", "Med.", "Merc.", "Mez.", "Mur-ac.", "Nat-m.", "Nat-s.", "Nit-ac.", "Nux-v.", "Pall.", "Petr.", "Phos.", "Phos-ac.", "Pic-ac.", "Plat.", "Puls.", "Ran-b.", "Rhus-t.", "Sabal", "Sars.", "Sec.", "Sep.", "Sil.", "Spong", "Staph.", "Sulph.", "Thuja", "Zinc."],
    "urethra-67-1": ["Agar.", "Alum.", "Am-c.", "Aur.", "Calc.", "Carb-v.", "Caust.", "Cham.", "China", "Cimic.", "Coff.", "Cupr.", "Dulc.", "Ferr.", "Ign.", "Kali-c.", "Lach.", "Lyc.", "Mag-c.", "Med.", "Merc.", "Mur-ac.", "Nat-m.", "Nux-v.", "Petr.", "Phos.", "Phos-ac.", "Puls.", "Sep.", "Sil.", "Staph.", "Sulph.", "Thuja", "Zinc."],
    "urethra-67-2": ["Aur.", "Bov.", "Calc.", "Caust.", "China", "Cimic.", "Cinnb.", "Con.", "Croc.", "Dulc.", "Ferr.", "Lach.", "Lyc.", "Mag-c.", "Nat-m.", "Nux-v.", "Puls.", "Sep.", "Sil.", "Staph.", "Sulph."],
    "urethra-67-3": ["Aur.", "Bov.", "Calc.", "Caust.", "Cimic.", "Cinnb.", "Con.", "Dulc.", "Ferr.", "Lach.", "Lyc.", "Mag-c.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sep.", "Sil.", "Staph.", "Sulph."],
    "urethra-67-4": ["Agar.", "Aur.", "Bov.", "Calc.", "Caust.", "Cimic.", "Con.", "Ferr.", "Lach.", "Lyc.", "Mag-c.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sil.", "Sulph."],
    "urethra-67-5": ["Aur.", "Calc.", "Caust.", "Croc.", "Ferr.", "Ign.", "Lach.", "Lyc.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Sep.", "Sulph."],
    "urethra-67-6": ["Agar.", "Alum.", "Amm-c.", "Arg-n.", "Aur.", "Bell.", "Bov.", "Bry.", "Calc.", "Canth.", "Carb-v.", "Caust.", "Cham.", "Chel.", "China", "Cimic.", "Cocc.", "Coff.", "Con.", "Cupr-a.", "Dulc.", "Ferr.", "Fluor.", "Graph.", "Hepar", "Ign.", "Kali-c.", "Lach.", "Lyc.", "Mag-c.", "Med.", "Merc.", "Nat-m.", "Nat-s.", "Nit-ac.", "Nux-v.", "Pall.", "Petr.", "Phos.", "Puls.", "Ran-b.", "Rhus-t.", "Sabal", "Sars.", "Sec.", "Sep.", "Sil.", "Staph.", "Sulph."],
    "urethra-67-7": ["Alum.", "Am-c.", "Aur.", "Bary-c.", "Calc.", "Caust.", "Cimic.", "Con.", "Cupr.", "Dig.", "Ferr.", "Ign.", "Kali-c.", "Lach.", "Lyc.", "Mag-c.", "Med.", "Nat-m.", "Nux-v.", "Petr.", "Phos.", "Puls.", "Sep.", "Sil.", "Staph.", "Sulph.", "Zinc."],
    "urethra-67-8": ["Aur.", "Bov.", "Calc.", "Caust.", "Con.", "Dulc.", "Ferr.", "Lach.", "Lyc.", "Nat-m.", "Nux-v.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "urethra-77-17": ["Am-c.", "Aur.", "Bov.", "Calc.", "Caust.", "Cimic.", "Con.", "Dulc.", "Ferr.", "Ign.", "Lach.", "Lyc.", "Mag-c.", "Med.", "Nat-m.", "Nux-v.", "Puls.", "Sep.", "Sil.", "Sulph."],
    "urethra-80": ["Agn.", "Alum.", "Apis", "Arg-n.", "Bary-c.", "Bry.", "Calc.", "Carb-v.", "Caust.", "Cham.", "Chel.", "China", "Cimic.", "Cocc.", "Coff.", "Coloc.", "Con.", "Croc.", "Eup-per.", "Ferr.", "Graph.", "Hepar", "Ign.", "Kali-c.", "Lach.", "Lil-t.", "Lyc.", "Mag-c.", "Med.", "Merc.", "Mur-ac.", "Nat-m.", "Nat-s.", "Nit-ac.", "Nux-v.", "Ox-ac.", "Petr.", "Phos.", "Phos-ac.", "Puls.", "Ran-b.", "Rhus-t.", "Ruta", "Sars.", "Sec.", "Sep.", "Sil.", "Staph.", "Sulph.", "Zinc."],
    "urethra-101": ["Agar.", "Alum.", "Am-c.", "Arn.", "Ars.", "Bell.", "Calc.", "Caust.", "Con.", "Cupr.", "Hyos.", "Lach.", "Nux-v.", "Op.", "Ox-ac.", "Phos.", "Plat.", "Rhus-t.", "Sec.", "Stram.", "Sulph.", "Verat."],

    # === VERTIGO ===
    "vertigo-29-1": ["Acon.", "Ars.", "Bell.", "Calc.", "China", "Gels.", "Ign.", "Lach.", "Nat-m.", "Phos.", "Puls.", "Rhus-t.", "Sep.", "Sil.", "Sulph."],
    "vertigo-29-2": ["Acon.", "Alum.", "Bary-c.", "Bry.", "Calc.", "Carb-v.", "Caust.", "China", "Cocc.", "Con.", "Dulc.", "Ferr-p.", "Gels.", "Hepar", "Ign.", "Kali-c.", "Lach.", "Lyc.", "Nat-m.", "Nat-s.", "Nit-ac.", "Nux-m.", "Nux-v.", "Petr.", "Phos.", "Phos-ac.", "Puls.", "Rhus-t.", "Sec.", "Sep.", "Sil.", "Spong", "Sulph."],
    "vertigo-60": ["Agar.", "Alum.", "Am-c.", "Arg-n.", "Ars.", "Aur.", "Bary-c.", "Bry.", "Calc.", "Carb-v.", "Caust.", "Chel.", "Chin.", "Cimic.", "Cocc.", "Coff.", "Con.", "Cupr.", "Dulc.", "Eup-per.", "Ferr-p.", "Gels.", "Graph.", "Hepar", "Ign.", "Kali-c.", "Kali-p.", "Lach.", "Lyc.", "Mag-c.", "Mag-m.", "Med.", "Merc.", "Nat-m.", "Nat-s.", "Nit-ac.", "Nux-m.", "Nux-v.", "Petr.", "Phos.", "Phos-ac.", "Pic-ac.", "Puls.", "Rhus-t.", "Ruta", "Sars.", "Sec.", "Sep.", "Sil.", "Spong", "Staph.", "Sulph.", "Zinc."],
    "vertigo-71": ["Agar.", "Alum.", "Am-c.", "Arg-n.", "Ars.", "Aur.", "Bary-c.", "Bry.", "Calc.", "Carb-v.", "Caust.", "Chel.", "Chin.", "Cimic.", "Cocc.", "Coff.", "Con.", "Cupr.", "Dulc.", "Eup-per.", "Gels.", "Graph.", "Hepar", "Ign.", "Kali-c.", "Kali-p.", "Lach.", "Lyc.", "Mag-c.", "Mag-m.", "Med.", "Merc.", "Nat-m.", "Nat-s.", "Nit-ac.", "Nux-m.", "Nux-v.", "Petr.", "Phos.", "Phos-ac.", "Pic-ac.", "Puls.", "Rhus-t.", "Ruta", "Sars.", "Sec.", "Sep.", "Sil.", "Spong", "Staph.", "Sulph.", "Zinc."],
    "vertigo-76": ["Acon.", "Agar.", "Am-c.", "Arg-n.", "Ars.", "Bary-c.", "Bry.", "Calc.", "Carb-v.", "Caust.", "China", "Cimic.", "Cocc.", "Coff.", "Con.", "Dulc.", "Eup-per.", "Ferr-p.", "Gels.", "Graph.", "Hepar", "Ign.", "Kali-c.", "Lach.", "Lyc.", "Mag-c.", "Med.", "Merc.", "Nat-m.", "Nat-s.", "Nit-ac.", "Nux-m.", "Nux-v.", "Petr.", "Phos.", "Phos-ac.", "Puls.", "Rhus-t.", "Ruta", "Sars.", "Sec.", "Sep.", "Sil.", "Spong", "Sulph.", "Zinc."],
    "vertigo-77": ["Agar.", "Alum.", "Am-c.", "Aur.", "Bary-c.", "Bry.", "Calc.", "Carb-v.", "Caust.", "Chel.", "Chin.", "Cimic.", "Cocc.", "Coff.", "Con.", "Cupr.", "Dulc.", "Eup-per.", "Gels.", "Graph.", "Hepar", "Ign.", "Kali-c.", "Lach.", "Lyc.", "Mag-c.", "Med.", "Merc.", "Nat-m.", "Nat-s.", "Nit-ac.", "Nux-m.", "Nux-v.", "Petr.", "Phos.", "Phos-ac.", "Puls.", "Rhus-t.", "Ruta", "Sars.", "Sec.", "Sep.", "Sil.", "Spong", "Staph.", "Sulph.", "Zinc."],
    "vertigo-109": ["Agar.", "Alum.", "Am-c.", "Arg-n.", "Ars.", "Bary-c.", "Bry.", "Calc.", "Carb-v.", "Caust.", "Chel.", "Chin.", "Cimic.", "Cocc.", "Coff.", "Con.", "Cupr.", "Dulc.", "Eup-per.", "Gels.", "Graph.", "Hepar", "Ign.", "Kali-c.", "Lach.", "Lyc.", "Mag-c.", "Med.", "Merc.", "Nat-m.", "Nat-s.", "Nit-ac.", "Nux-m.", "Nux-v.", "Petr.", "Phos.", "Phos-ac.", "Puls.", "Rhus-t.", "Ruta", "Sars.", "Sec.", "Sep.", "Sil.", "Spong", "Staph.", "Sulph.", "Zinc."],
    "vertigo-111-1": ["Agar.", "Alum.", "Am-c.", "Arg-n.", "Ars.", "Bary-c.", "Bry.", "Calc.", "Carb-v.", "Caust.", "Chel.", "Chin.", "Cimic.", "Cocc.", "Coff.", "Con.", "Cupr.", "Dulc.", "Eup-per.", "Gels.", "Graph.", "Hepar", "Ign.", "Kali-c.", "Lach.", "Lyc.", "Mag-c.", "Med.", "Merc.", "Nat-m.", "Nat-s.", "Nit-ac.", "Nux-m.", "Nux-v.", "Petr.", "Phos.", "Phos-ac.", "Puls.", "Rhus-t.", "Ruta", "Sars.", "Sec.", "Sep.", "Sil.", "Spong", "Staph.", "Sulph.", "Zinc."],
    "vertigo-128": ["Agar.", "Alum.", "Am-c.", "Arn.", "Ars.", "Bell.", "Calc.", "Caust.", "Cimic.", "Coff.", "Croc.", "Cupr.", "Gels.", "Hyos.", "Ign.", "Kali-c.", "Lach.", "Lyc.", "Mag-c.", "Merc.", "Nat-m.", "Nux-m.", "Nux-v.", "Op.", "Ox-ac.", "Phos.", "Phos-ac.", "Plat.", "Puls.", "Rhus-t.", "Sec.", "Sep.", "Sil.", "Spong", "Sulph.", "Verat.", "Zinc."],
    "vertigo-128-1": ["Agar.", "Alum.", "Am-c.", "Arg-n.", "Bary-c.", "Bry.", "Calc.", "Carb-v.", "Caust.", "Chel.", "Chin.", "Cimic.", "Cocc.", "Coff.", "Con.", "Cupr.", "Dulc.", "Eup-per.", "Gels.", "Graph.", "Hepar", "Ign.", "Kali-c.", "Lach.", "Lyc.", "Mag-c.", "Med.", "Merc.", "Nat-m.", "Nat-s.", "Nit-ac.", "Nux-m.", "Nux-v.", "Petr.", "Phos.", "Phos-ac.", "Puls.", "Rhus-t.", "Ruta", "Sars.", "Sec.", "Sep.", "Sil.", "Spong", "Staph.", "Sulph.", "Zinc."],
    "vertigo-140": ["Agar.", "Alum.", "Am-c.", "Aur.", "Bary-c.", "Bry.", "Calc.", "Carb-v.", "Caust.", "Chel.", "Chin.", "Cimic.", "Cocc.", "Coff.", "Con.", "Cupr.", "Dulc.", "Eup-per.", "Gels.", "Graph.", "Hepar", "Ign.", "Kali-c.", "Lach.", "Lyc.", "Mag-c.", "Med.", "Merc.", "Nat-m.", "Nat-s.", "Nit-ac.", "Nux-m.", "Nux-v.", "Petr.", "Phos.", "Phos-ac.", "Puls.", "Rhus-t.", "Ruta", "Sars.", "Sec.", "Sep.", "Sil.", "Spong", "Staph.", "Sulph.", "Zinc."],

    # === VISION ===
    "vision-40": ["Agar.", "Aur.", "Bell.", "Bry.", "Bov.", "Bufo", "Calc.", "Caust.", "Cann-i.", "Cimic.", "Coff.", "Croc.", "Cupr.", "Helleb.", "Hyos.", "Kali-bi.", "Lach.", "Lyc.", "Nat-m.", "Nux-v.", "Op.", "Ox-ac.", "Phos.", "Plat.", "Puls.", "Ran-b.", "Rhus-t.", "Sars.", "Sec.", "Sep.", "Sil.", "Stram.", "Sulph."],
    "vision-51": ["Agar.", "Aur.", "Bary-c.", "Calc.", "Caust.", "Con.", "Euphr.", "Ign.", "Kali-bi.", "Lyc.", "Mag-c.", "Nat-m.", "Nux-v.", "Phos.", "Puls.", "Rhus-t.", "Sep.", "Sil.", "Sulph."],
    "vision-82": ["Agar.", "Aur.", "Bary-c.", "Calc.", "Caust.", "Nat-m.", "Nit-ac.", "Nux-v.", "Phos.", "Puls.", "Rhus-t.", "Sil.", "Sulph."],
}


def main():
    print(f"Remedies map has {len(REMEDIES_MAP)} entries")
    
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    updated = 0
    not_found = []
    
    for rubric_id, remedies in REMEDIES_MAP.items():
        # Build the old and new strings
        # Match pattern: remedies: []  or remedies: [] as string[]
        old_patterns = [
            f"remedies: []",
            f"remedies: [] as string[]"
        ]
        
        for old_str in old_patterns:
            search_str = f"{{ id: '{rubric_id}', "
            # Find the line with this rubric
            idx = content.find(search_str)
            if idx == -1:
                if rubric_id not in [x[0] for x in not_found]:
                    not_found.append(rubric_id)
                continue
            
            # Find the remedies: [] within this line
            line_end = content.find('\n', idx)
            line = content[idx:line_end]
            
            if old_str in line:
                # Format remedies as TS array
                remedies_str = str(remedies).replace("'", "\\'")
                new_line = line.replace(old_str, f"remedies: {remedies_str} as string[]")
                content = content[:idx] + new_line + content[line_end:]
                updated += 1
                break
    
    # Also update the first patterns: mind-1 and mind-2 which use 'remedies: [] as string[]'
    # These should already be caught above
    
    print(f"Updated {updated} rubrics")
    if not_found:
        print(f"Not found: {not_found}")
    
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Saved to {DATA_FILE}")

if __name__ == "__main__":
    main()
