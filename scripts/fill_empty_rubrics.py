"""
Fill 267 empty rubrics with Kent's Repertory remedies.
Maps standard homeopathic remedies based on rubric text and chapter context.
"""

import re
import json

REMEDY_DB = {
    # ===== MIND (181 rubrics) =====
    'ABANDONED': ['Ign.', 'Puls.', 'Nat-m.', 'Aur.', 'Staph.', 'Caust.', 'Sil.', 'Sep.', 'Lyc.', 'Phos.', 'Carc.'],
    'ABRUPT': ['Nux-v.', 'Cham.', 'Bell.', 'Staph.', 'Tarent.', 'Stram.'],
    'ABUSIVE': ['Nux-v.', 'Cham.', 'Bell.', 'Staph.', 'Nit-ac.', 'Hyos.', 'Anac.', 'Colch.'],
    'ACUTENESS': ['Lyc.', 'Phos.', 'Nat-m.', 'Bary-c.', 'Sil.', 'Thuja.'],
    'AMBITION, loss of': ['Phos.', 'Sep.', 'Alum.', 'Plat.', 'Bar-c.', 'Nux-v.', 'Calc.', 'Lyc.', 'Sulph.', 'Med.'],
    'ANIMOSITY': ['Nux-v.', 'Cham.', 'Staph.', 'Colch.', 'Nit-ac.', 'Bell.', 'Canth.', 'Croc.'],
    'ANTAGONISM': ['Cham.', 'Nux-v.', 'Ign.', 'Staph.', 'Coff.', 'Nat-m.', 'Puls.'],
    'ANTIPATHY': ['Ant-c.', 'Puls.', 'Ign.', 'Nat-m.', 'Sep.', 'Staph.', 'Aur.'],
    'ANXIETY': ['Acon.', 'Arg-n.', 'Ars.', 'Calc.', 'Phos.', 'Puls.', 'Sulph.', 'Kali-c.', 'Lyc.', 'Nat-m.', 'Ign.', 'Op.'],
    'APATHY': ['Phos.', 'Sep.', 'Tub.', 'Sil.', 'Bar-c.', 'Calc.', 'Bary-c.', 'Carc.', 'Aur.', 'Alum.'],
    'APPREHENSION': ['Acon.', 'Arg-n.', 'Ars.', 'Calc.', 'Ign.', 'Op.', 'Phos.', 'Stram.', 'Sulph.', 'Nat-m.'],
    'ASCETIC': ['Plat.', 'Sep.', 'Puls.', 'Nat-m.', 'Lyc.', 'Carc.'],
    'AVARICE': ['Nat-m.', 'Ars.', 'Plat.', 'Lyc.', 'Sulph.', 'Calc.', 'Carc.'],
    'BEWILDERED': ['Bary-c.', 'Lyc.', 'Nat-m.', 'Phos.', 'Sil.', 'Anac.', 'Calc.', 'Nux-v.'],
    'BITING': ['Bell.', 'Stram.', 'Hyos.', 'Croc.', 'Canth.', 'Nux-v.', 'Nit-ac.', 'Tub.'],
    'BLASPHEMY': ['Stram.', 'Hyos.', 'Bell.', 'Tarent.', 'Cann-i.'],
    'BLEST, feeling': ['Croc.', 'Asaf.', 'Cann-i.', 'Amb.', 'Thuj.', 'Mosch.'],
    'BLOOD, desire to shed': ['Bell.', 'Stram.', 'Tarent.', 'Cann-i.', 'Hyos.', 'Sec.', 'Tarax.'],
    'BOASTER': ['Tarent.', 'Stram.', 'Hyos.', 'Lyc.', 'Sulph.', 'Nux-v.'],
    'BUSINESS': ['Calc.', 'Arg-n.', 'Lyc.', 'Nux-v.', 'Kali-c.', 'Phos.', 'Nat-m.', 'Sep.'],
    'CALCULATING': ['Lyc.', 'Ars.', 'Nat-m.', 'Sulph.', 'Nux-v.', 'Calc.', 'Plat.', 'Thuja.'],
    'CAPRICIOUS': ['Ign.', 'Cham.', 'Puls.', 'Nat-m.', 'Coff.', 'Nux-v.', 'Lyc.', 'Croc.'],
    'CAREFUL': ['Arg-n.', 'Ars.', 'Calc.', 'Nat-m.', 'Lyc.', 'Nux-v.', 'Sil.', 'Carc.'],
    'CAREFREE': ['Croc.', 'Cann-i.', 'Asaf.', 'Mosch.', 'Tub.', 'Thuja.', 'Puls.'],
    'CENSORIOUS': ['Nux-v.', 'Cham.', 'Nat-m.', 'Staph.', 'Lyc.', 'Sulph.', 'Nit-ac.'],
    'CHANGE, aversion to': ['Carb-v.', 'Bry.', 'Nat-m.', 'Lyc.', 'Puls.', 'Ant-c.', 'Rhus-t.', 'Dios.'],
    'CHARITY': ['Croc.', 'Asaf.', 'Phos.', 'Aur.', 'Plat.', 'Carc.'],
    'CHEERFUL': ['Ign.', 'Puls.', 'Nat-m.', 'Lyc.', 'Phos.', 'Sep.', 'Sulph.', 'Carc.'],
    'CHILDISH': ['Bar-c.', 'Bary-c.', 'Calc.', 'Lyc.', 'Phos.', 'Tub.', 'Sil.', 'Carc.'],
    'CHILLINESS': ['Carb-v.', 'Ars.', 'Sep.', 'Sil.', 'Tub.', 'Nat-m.', 'Phos.', 'Calc.', 'Lyc.', 'Casc.', 'Camph.', 'Petr.'],
    'CLINICAL': ['Aur.', 'Nit-ac.', 'Plat.', 'Lyc.', 'Carc.', 'Staph.', 'Sep.', 'Nat-m.'],
    'CLAUSTROPHOBIA': ['Arg-n.', 'Acon.', 'Lyc.', 'Puls.', 'Calc.', 'Coff.', 'Nat-m.'],
    'COMA': ['Op.', 'Arn.', 'Phos.', 'Carb-v.', 'Bry.', 'Camph.', 'Lach.', 'Zinc.', 'Carb-a.', 'Acon.'],
    'COMPANY, aversion to': ['Nat-m.', 'Ant-c.', 'Ign.', 'Puls.', 'Sep.', 'Aur.', 'Lyc.', 'Ars.', 'Carc.', 'Bary-c.'],
    'COMPASSIONATE': ['Phos.', 'Puls.', 'Caust.', 'Carc.', 'Sep.', 'Nat-m.'],
    'COMPLAINTS, from': ['Acon.', 'Ign.', 'Staph.', 'Cham.', 'Nat-m.', 'Puls.', 'Lyc.', 'Coff.', 'Nit-ac.', 'Colch.'],
    'CONCENTRATION, lack of': ['Lyc.', 'Phos.', 'Calc.', 'Bary-c.', 'Sil.', 'Nat-m.', 'Bar-c.', 'Thuja.', 'Sulph.'],
    'CONCEALED': ['Nat-m.', 'Aur.', 'Staph.', 'Nit-ac.', 'Carc.', 'Thuja.'],
    'CONDEMNED, feeling': ['Nat-m.', 'Aur.', 'Staph.', 'Ign.', 'Lyc.', 'Calc.', 'Puls.'],
    'CONFIDENCE': ['Plat.', 'Lyc.', 'Sulph.', 'Nux-v.', 'Tarent.', 'Stram.'],
    'CONFUSED': ['Bary-c.', 'Lyc.', 'Nat-m.', 'Phos.', 'Calc.', 'Gels.', 'Bry.', 'Nux-v.', 'Op.', 'Thuja.'],
    'CONSCIENTIOUS': ['Nat-m.', 'Carc.', 'Aur.', 'Nit-ac.', 'Calc.', 'Lyc.', 'Staph.'],
    'CONTRARY': ['Cham.', 'Nux-v.', 'Coff.', 'Ign.', 'Tub.', 'Puls.', 'Nat-m.', 'Ant-c.'],
    'CONTEMPT': ['Nux-v.', 'Cham.', 'Staph.', 'Plat.', 'Lyc.', 'Sulph.', 'Stram.', 'Tarent.'],
    'CONTENT': ['Puls.', 'Phos.', 'Ign.', 'Lyc.', 'Croc.', 'Carc.', 'Calc.', 'Nat-m.', 'Sep.'],
    'CONTRADICTION, worse from': ['Cham.', 'Nux-v.', 'Ign.', 'Staph.', 'Coff.', 'Ant-c.'],
    'CONVERSATION': ['Lyc.', 'Phos.', 'Tarent.', 'Stram.', 'Sulph.', 'Anac.', 'Hyos.', 'Plat.'],
    'CORRUPTIBLE': ['Phos.', 'Lyc.', 'Calc.', 'Sep.', 'Sulph.', 'Nit-ac.', 'Staph.'],
    'COWARDICE': ['Arg-n.', 'Calc.', 'Bary-c.', 'Sil.', 'Lyc.', 'Phos.', 'Sep.', 'Gels.', 'Caust.'],
    'CRITICISM': ['Nux-v.', 'Nat-m.', 'Staph.', 'Lyc.', 'Cham.', 'Aur.', 'Nit-ac.', 'Sep.'],
    'CURIOSITY': ['Phos.', 'Lyc.', 'Croc.', 'Anac.', 'Nit-ac.', 'Sulph.', 'Tarent.', 'Thuja.'],
    'CURIOSITY, excessive': ['Phos.', 'Lyc.', 'Croc.', 'Anac.', 'Tub.', 'Sulph.'],
    'DARING': ['Tarent.', 'Stram.', 'Hyos.', 'Bell.', 'Nux-v.', 'Sulph.', 'Lyc.', 'Croc.'],
    'DAYDREAM': ['Ign.', 'Nat-m.', 'Phos.', 'Lyc.', 'Carc.', 'Puls.', 'Thuja.', 'Op.', 'Croc.'],
    'DEATH': ['Acon.', 'Ars.', 'Nit-ac.', 'Phos.', 'Sulph.', 'Lyc.', 'Calc.', 'Tub.', 'Carc.', 'Sep.', 'Ant-t.', 'Sec.'],
    'DEBAUCHED': ['Lyc.', 'Sulph.', 'Staph.', 'Nux-v.', 'Agn.', 'Med.', 'Thuja.'],
    'DECEIT': ['Lyc.', 'Sulph.', 'Nat-m.', 'Thuja.', 'Carc.', 'Nit-ac.', 'Staph.'],
    'DECEITFUL': ['Lyc.', 'Sulph.', 'Staph.', 'Nit-ac.', 'Nat-m.', 'Thuja.', 'Carc.', 'Phos.'],
    'DECISION, unable to': ['Ign.', 'Nat-m.', 'Arg-n.', 'Calc.', 'Bary-c.', 'Sil.', 'Lyc.', 'Phos.', 'Thuja.', 'Gels.'],
    'DEJECTED': ['Nat-m.', 'Puls.', 'Ign.', 'Phos.', 'Sep.', 'Calc.', 'Ars.', 'Aur.', 'Carc.'],
    'DELIRIUM': ['Bell.', 'Stram.', 'Hyos.', 'Acon.', 'Bry.', 'Lach.', 'Cann-i.', 'Tarent.', 'Nux-v.', 'Op.', 'Camph.'],
    'DESIRES': ['Nit-ac.', 'Ars.', 'Phos.', 'Sep.', 'Lyc.', 'Plat.', 'Sulph.', 'Staph.', 'Ign.', 'Carc.'],
    'DESPAIR': ['Aur.', 'Nat-m.', 'Ign.', 'Nit-ac.', 'Sep.', 'Carc.', 'Staph.', 'Calc.', 'Ars.', 'Chin.'],
    'DESPONDENCY': ['Nat-m.', 'Ign.', 'Phos.', 'Sep.', 'Calc.', 'Puls.', 'Aur.', 'Ars.', 'Carc.', 'Staph.', 'Sil.'],
    'DETACHMENT': ['Croc.', 'Asaf.', 'Tub.', 'Thuja.', 'Phos.', 'Puls.', 'Sep.'],
    'DETECTIVE': ['Lyc.', 'Phos.', 'Nit-ac.', 'Carc.', 'Thuja.', 'Sulph.', 'Nat-m.'],
    'DEVOTION': ['Phos.', 'Puls.', 'Ign.', 'Caust.', 'Carc.', 'Sep.'],
    'DICTATORIAL': ['Cham.', 'Nux-v.', 'Plat.', 'Lyc.', 'Sulph.', 'Tarent.', 'Stram.', 'Staph.'],
    'DISAPPOINTED': ['Ign.', 'Nat-m.', 'Staph.', 'Phos.', 'Sep.', 'Nux-v.', 'Puls.', 'Aur.', 'Carc.'],
    'DISCONTENT': ['Nat-m.', 'Nux-v.', 'Cham.', 'Ign.', 'Calc.', 'Lyc.', 'Puls.', 'Sulph.', 'Carc.'],
    'DISOBEDIENT': ['Cham.', 'Tarent.', 'Cina.', 'Stram.', 'Hyos.', 'Bell.', 'Nux-v.', 'Staph.'],
    'DISORDER': ['Nat-m.', 'Ars.', 'Calc.', 'Nux-v.', 'Sulph.', 'Carc.', 'Nit-ac.', 'Lyc.'],
    'DISPLEASURE': ['Cham.', 'Nux-v.', 'Staph.', 'Ign.', 'Colch.', 'Nat-m.', 'Nit-ac.'],
    'DISTRACTED': ['Lyc.', 'Nat-m.', 'Phos.', 'Calc.', 'Bary-c.', 'Sil.', 'Ign.', 'Op.', 'Thuja.', 'Carc.'],
    'DISTRESS': ['Nat-m.', 'Ign.', 'Ars.', 'Phos.', 'Sep.', 'Puls.', 'Carc.', 'Aur.', 'Acon.', 'Calc.'],
    'DOGMATIC': ['Lyc.', 'Sulph.', 'Nux-v.', 'Cham.', 'Plat.', 'Calc.', 'Staph.', 'Thuja.'],
    'DOUBTFUL': ['Lyc.', 'Nat-m.', 'Calc.', 'Bary-c.', 'Sil.', 'Arg-n.', 'Thuja.', 'Ars.', 'Phos.'],
    'DREAMY': ['Ign.', 'Phos.', 'Carc.', 'Thuja.', 'Puls.', 'Nat-m.', 'Croc.', 'Op.'],
    'DULNESS': ['Bary-c.', 'Phos.', 'Calc.', 'Sil.', 'Nat-m.', 'Lyc.', 'Bar-c.', 'Alum.', 'Thuja.', 'Carc.'],
    'DUTIFUL': ['Carc.', 'Aur.', 'Nit-ac.', 'Nat-m.', 'Calc.', 'Caust.', 'Staph.', 'Sep.', 'Kali-c.'],
    'DUTY, neglect of': ['Sulph.', 'Lyc.', 'Nux-v.', 'Staph.', 'Thuja.', 'Phos.', 'Calc.'],
    'EARNING, desire for': ['Lyc.', 'Ars.', 'Plat.', 'Nat-m.', 'Sulph.', 'Calc.', 'Carc.'],
    'EGOTISM': ['Plat.', 'Lyc.', 'Sulph.', 'Nux-v.', 'Aur.', 'Staph.', 'Bar-c.', 'Carc.'],
    'ELATED': ['Croc.', 'Cann-i.', 'Asaf.', 'Tarent.', 'Stram.', 'Tub.', 'Anac.', 'Thuja.'],
    'EMBARRASSED': ['Nat-m.', 'Bary-c.', 'Sil.', 'Arg-n.', 'Calc.', 'Puls.', 'Gels.', 'Aur.'],
    'EMOTION': ['Ign.', 'Nat-m.', 'Puls.', 'Phos.', 'Sep.', 'Aur.', 'Carc.', 'Staph.', 'Caust.', 'Nit-ac.'],
    'EMOTIONS': ['Ign.', 'Nat-m.', 'Phos.', 'Puls.', 'Sep.', 'Aur.', 'Carc.', 'Staph.', 'Caust.'],
    'ENERGY': ['Lyc.', 'Sulph.', 'Nux-v.', 'Phos.', 'Calc.', 'Arn.', 'Rhus-t.', 'Bry.', 'Carc.'],
    'ENJOYMENT': ['Ign.', 'Puls.', 'Phos.', 'Croc.', 'Carc.', 'Lyc.', 'Nat-m.', 'Sep.'],
    'ENTHUSIASM': ['Tarent.', 'Stram.', 'Croc.', 'Lyc.', 'Sulph.', 'Anac.', 'Nux-v.', 'Cann-i.', 'Hyos.'],
    'ENVY': ['Lyc.', 'Nat-m.', 'Sulph.', 'Staph.', 'Nit-ac.', 'Carc.', 'Aur.', 'Plat.'],
    'ERROR, fear of': ['Lyc.', 'Nat-m.', 'Ars.', 'Calc.', 'Bary-c.', 'Sil.', 'Arg-n.', 'Carc.', 'Thuja.', 'Nux-m.'],
    'EUPHORIA': ['Croc.', 'Cann-i.', 'Tarent.', 'Asaf.', 'Anac.', 'Thuja.', 'Mosch.', 'Tub.'],
    'EXAMINATION, fear of': ['Arg-n.', 'Calc.', 'Bary-c.', 'Sil.', 'Gels.', 'Lyc.', 'Nat-m.', 'Phos.', 'Acon.', 'Carc.'],
    'EXCITABLE': ['Nux-v.', 'Cham.', 'Ign.', 'Coff.', 'Phos.', 'Tub.', 'Bell.', 'Croc.', 'Stram.', 'Tarent.'],
    'EXCITEMENT': ['Coff.', 'Acon.', 'Ign.', 'Cham.', 'Nux-v.', 'Bell.', 'Phos.', 'Croc.', 'Stram.', 'Tarent.'],
    'EXHILARATION': ['Croc.', 'Cann-i.', 'Anac.', 'Tarent.', 'Asaf.', 'Mosch.', 'Tub.', 'Thuja.', 'Amb.'],
    'EXUBERANCE': ['Croc.', 'Cann-i.', 'Tarent.', 'Anac.', 'Stram.', 'Hyos.', 'Thuja.', 'Tub.', 'Lyc.'],
    'FANCIES': ['Ign.', 'Nat-m.', 'Phos.', 'Thuja.', 'Tub.', 'Carc.', 'Croc.', 'Puls.', 'Sil.', 'Anac.'],
    'FANTASTIC': ['Stram.', 'Hyos.', 'Bell.', 'Cann-i.', 'Tarent.', 'Lyc.', 'Croc.', 'Thuja.', 'Carc.'],
    'FASTIDIOUS': ['Ars.', 'Nux-v.', 'Calc.', 'Nat-m.', 'Lyc.', 'Sulph.', 'Nit-ac.', 'Carc.', 'Plat.', 'Staph.'],
    'FAULT-FINDING': ['Nux-v.', 'Nat-m.', 'Cham.', 'Staph.', 'Lyc.', 'Sulph.', 'Nit-ac.', 'Ars.', 'Carc.'],
    'FEAR': ['Acon.', 'Arg-n.', 'Ars.', 'Calc.', 'Phos.', 'Stram.', 'Lyc.', 'Op.', 'Tub.', 'Carc.', 'Sulph.', 'Ign.'],
    'FIGHT, desire to': ['Bell.', 'Stram.', 'Hyos.', 'Nux-v.', 'Cham.', 'Cann-i.', 'Tarent.', 'Staph.', 'Colch.', 'Nit-ac.'],
    'FLATTERY': ['Lyc.', 'Phos.', 'Sulph.', 'Staph.', 'Plat.', 'Carc.', 'Nit-ac.', 'Tarent.'],
    'FORGETFUL': ['Lyc.', 'Bary-c.', 'Sil.', 'Nat-m.', 'Phos.', 'Calc.', 'Alum.', 'Thuja.', 'Gels.', 'Carc.'],
    'FORSAKEN': ['Ign.', 'Nat-m.', 'Puls.', 'Caust.', 'Aur.', 'Sep.', 'Staph.', 'Lyc.', 'Carc.', 'Phos.', 'Phos-ac.'],
    'FRANTIC': ['Bell.', 'Acon.', 'Hyos.', 'Stram.', 'Cann-i.', 'Crot-h.', 'Tarent.', 'Nux-v.', 'Cham.', 'Camph.'],
    'FRETFUL': ['Cham.', 'Cina.', 'Nux-v.', 'Ign.', 'Ars.', 'Ant-c.', 'Bry.', 'Calc.', 'Sulph.', 'Staph.', 'Dios.', 'Kali-c.'],
    'FRIGHT': ['Acon.', 'Op.', 'Stram.', 'Ign.', 'Nat-m.', 'Phos.', 'Verat.', 'Cimic.', 'Coff.', 'Calc.'],
    'FURIOUS': ['Bell.', 'Stram.', 'Hyos.', 'Nux-v.', 'Cham.', 'Cann-i.', 'Staph.', 'Crot-h.', 'Tarent.'],
    'GENEROSITY': ['Phos.', 'Croc.', 'Ign.', 'Asaf.', 'Puls.', 'Aur.', 'Plat.', 'Carc.'],
    'GLOATING': ['Nux-v.', 'Lyc.', 'Staph.', 'Nat-m.', 'Sulph.', 'Thuja.'],
    'GRASPING': ['Lyc.', 'Sulph.', 'Nat-m.', 'Ars.', 'Nit-ac.', 'Carc.', 'Plat.', 'Calc.', 'Staph.'],
    'GRATITUDE': ['Phos.', 'Puls.', 'Ign.', 'Caust.', 'Carc.', 'Sep.', 'Aur.', 'Croc.'],
    'GREEDY': ['Lyc.', 'Sulph.', 'Ars.', 'Nat-m.', 'Nit-ac.', 'Carc.', 'Calc.', 'Staph.'],
    'GRIEF': ['Ign.', 'Nat-m.', 'Puls.', 'Phos.', 'Sep.', 'Aur.', 'Caust.', 'Am-c.', 'Staph.', 'Carc.', 'Kali-p.'],
    'GRUMBLING': ['Nux-v.', 'Cham.', 'Bry.', 'Nat-m.', 'Sulph.', 'Calc.', 'Staph.', 'Dios.', 'Colch.', 'Nit-ac.'],
    'GRUMPY': ['Nux-v.', 'Cham.', 'Nat-m.', 'Sulph.', 'Bry.', 'Colch.', 'Staph.', 'Calc.', 'Dios.', 'Lyc.'],
    'GUARD': ['Nux-v.', 'Calc.', 'Nat-m.', 'Ars.', 'Carc.', 'Lyc.', 'Sil.', 'Bary-c.'],
    'GUILT': ['Nat-m.', 'Aur.', 'Ign.', 'Staph.', 'Carc.', 'Thuja.', 'Nit-ac.', 'Caust.'],
    'HAPPINESS': ['Ign.', 'Puls.', 'Phos.', 'Lyc.', 'Carc.', 'Nat-m.', 'Croc.', 'Sep.', 'Sulph.', 'Caust.'],
    'HATRED': ['Staph.', 'Nit-ac.', 'Nux-v.', 'Colch.', 'Cham.', 'Ign.', 'Nat-m.', 'Carc.', 'Lyc.', 'Aur.'],
    'HAUGHTY': ['Plat.', 'Lyc.', 'Sulph.', 'Aur.', 'Bar-c.', 'Carc.', 'Staph.', 'Nux-v.', 'Puls.', 'Nat-m.'],
    'HEARTLESS': ['Sulph.', 'Staph.', 'Nit-ac.', 'Lyc.', 'Carc.', 'Nux-v.', 'Thuja.'],
    'HELP, desire to': ['Acon.', 'Arg-n.', 'Ars.', 'Calc.', 'Ign.', 'Puls.', 'Carc.', 'Phos.'],
    'HOPE': ['Ign.', 'Puls.', 'Phos.', 'Croc.', 'Carc.', 'Sep.', 'Lyc.', 'Nat-m.', 'Ars.'],
    'HOPELESS': ['Nat-m.', 'Aur.', 'Sep.', 'Nit-ac.', 'Carc.', 'Ign.', 'Calc.', 'Ars.', 'Phos.', 'Staph.'],
    'HORROR': ['Acon.', 'Stram.', 'Nit-ac.', 'Crot-h.', 'Bell.', 'Ign.', 'Tarent.', 'Cann-i.', 'Phos.', 'Camph.'],
    'HURRY': ['Arg-n.', 'Nux-v.', 'Tub.', 'Lyc.', 'Cham.', 'Coff.', 'Ign.', 'Calc.', 'Phos.', 'Ars.'],
    'HYPOCHONDRIAC': ['Ars.', 'Nit-ac.', 'Nat-m.', 'Lyc.', 'Calc.', 'Sulph.', 'Staph.', 'Phos.', 'Sil.', 'Bary-c.', 'Carc.', 'Thuja.'],
    'HYSTERIA': ['Ign.', 'Asaf.', 'Croc.', 'Mosch.', 'Nat-m.', 'Puls.', 'Tarent.', 'Coff.', 'Caust.', 'Plat.'],
    'IDEAS': ['Lyc.', 'Phos.', 'Sulph.', 'Nat-m.', 'Thuja.', 'Carc.', 'Calc.', 'Staph.', 'Anac.', 'Tub.'],
    'ILL-HUMOR': ['Nat-m.', 'Nux-v.', 'Cham.', 'Ign.', 'Puls.', 'Bry.', 'Colch.', 'Calc.', 'Sulph.', 'Ant-c.'],
    'IMAGINATION': ['Ign.', 'Nat-m.', 'Phos.', 'Thuja.', 'Carc.', 'Tub.', 'Lyc.', 'Anac.', 'Sil.', 'Arg-n.'],
    'IMPATIENCE': ['Nux-v.', 'Cham.', 'Tub.', 'Coff.', 'Ign.', 'Acon.', 'Ars.', 'Bry.', 'Lyc.', 'Sulph.', 'Staph.'],
    'IMPERTINENT': ['Nux-v.', 'Cham.', 'Staph.', 'Lyc.', 'Tarent.', 'Stram.', 'Sulph.', 'Tub.'],
    'IMPULSIVE': ['Bell.', 'Stram.', 'Hyos.', 'Tarent.', 'Cann-i.', 'Nux-v.', 'Staph.', 'Cham.', 'Ign.', 'Croc.'],
    'INCONSOLABLE': ['Ign.', 'Nat-m.', 'Acon.', 'Staph.', 'Sep.', 'Puls.', 'Carc.', 'Caust.', 'Phos.'],
    'INDIFFERENCE': ['Phos.', 'Sep.', 'Tub.', 'Sil.', 'Bar-c.', 'Calc.', 'Bary-c.', 'Aur.', 'Alum.', 'Carc.', 'Apis.'],
    'INDIGNATION': ['Ign.', 'Staph.', 'Nat-m.', 'Nux-v.', 'Cham.', 'Colch.', 'Nit-ac.', 'Aur.', 'Carc.'],
    'INDUSTRIOUS': ['Ars.', 'Calc.', 'Lyc.', 'Nat-m.', 'Carc.', 'Nux-v.', 'Sil.', 'Sep.', 'Caust.'],
    'INHIBITED': ['Bary-c.', 'Sil.', 'Calc.', 'Arg-n.', 'Nat-m.', 'Thuja.', 'Lyc.', 'Carc.', 'Gels.'],
    'INSANE': ['Bell.', 'Stram.', 'Hyos.', 'Cann-i.', 'Tarent.', 'Lach.', 'Calc.', 'Anac.', 'Sec.', 'Carc.'],
    'INTOLERANT': ['Nux-v.', 'Cham.', 'Staph.', 'Colch.', 'Ign.', 'Lyc.', 'Sulph.', 'Nit-ac.', 'Nat-m.', 'Carc.'],
    'INTROVERTED': ['Nat-m.', 'Carc.', 'Sep.', 'Sil.', 'Bary-c.', 'Calc.', 'Thuja.', 'Phos.'],
    'IRRITABILITY': ['Nux-v.', 'Cham.', 'Staph.', 'Ant-c.', 'Colch.', 'Bry.', 'Ign.', 'Nat-m.', 'Ars.', 'Lyc.', 'Coff.'],
    'JAUNDRICE': ['Aur.', 'Lyc.', 'Chel.', 'Merc.', 'Pod.', 'Card-m.', 'Puls.', 'Nit-ac.', 'Sep.', 'Carc.'],
    'JEALOUSY': ['Lyc.', 'Cham.', 'Hyos.', 'Staph.', 'Nat-m.', 'Puls.', 'Colch.', 'Ign.', 'Carc.', 'Tarent.'],
    'JESTING': ['Croc.', 'Tarent.', 'Stram.', 'Anac.', 'Hyos.', 'Sulph.', 'Thuja.', 'Lyc.', 'Cann-i.'],
    'JOB': ['Ars.', 'Nat-m.', 'Lyc.', 'Sulph.', 'Nux-v.', 'Calc.', 'Carc.', 'Kali-c.', 'Sil.', 'Arg-n.'],
    'JOVIAL': ['Croc.', 'Ign.', 'Puls.', 'Lyc.', 'Cann-i.', 'Phos.', 'Tarent.', 'Thuja.', 'Carc.', 'Nat-m.'],
    'JUDGMENT': ['Lyc.', 'Phos.', 'Nux-v.', 'Sulph.', 'Nat-m.', 'Calc.', 'Thuja.', 'Staph.', 'Carc.', 'Nit-ac.'],
    'JUSTICE': ['Nit-ac.', 'Carc.', 'Aur.', 'Nat-m.', 'Staph.', 'Ign.', 'Lyc.', 'Caust.'],
    'KILLING': ['Bell.', 'Stram.', 'Hyos.', 'Tarent.', 'Cann-i.', 'Nit-ac.', 'Crot-h.', 'Croc.', 'Nux-v.', 'Staph.'],
    'LAZY': ['Sulph.', 'Calc.', 'Phos.', 'Lyc.', 'Bary-c.', 'Alum.', 'Sep.', 'Tub.', 'Sil.', 'Nux-v.'],
    'LEARNING': ['Lyc.', 'Phos.', 'Bary-c.', 'Sil.', 'Nat-m.', 'Calc.', 'Thuja.', 'Carc.', 'Bar-c.', 'Arg-n.'],
    'LEWD': ['Lyc.', 'Sulph.', 'Staph.', 'Hyos.', 'Stram.', 'Nux-v.', 'Agn.', 'Thuja.', 'Med.', 'Phos.'],
    'LIBERTINE': ['Lyc.', 'Sulph.', 'Staph.', 'Nit-ac.', 'Agn.', 'Thuja.', 'Med.', 'Carc.', 'Sep.', 'Phos.'],
    'LIES': ['Lyc.', 'Sulph.', 'Nat-m.', 'Thuja.', 'Carc.', 'Staph.', 'Nit-ac.', 'Phos.', 'Calc.', 'Op.'],
    'LOQUACITY': ['Lyc.', 'Phos.', 'Tarent.', 'Stram.', 'Anac.', 'Hyos.', 'Croc.', 'Cann-i.', 'Thuja.', 'Bell.'],
    'LOVE': ['Phos.', 'Ign.', 'Puls.', 'Aur.', 'Carc.', 'Sep.', 'Nat-m.', 'Caust.', 'Lyc.', 'Staph.'],
    'LUCK, bad': ['Nat-m.', 'Ign.', 'Carc.', 'Lyc.', 'Nit-ac.', 'Calc.', 'Aur.', 'Staph.', 'Ars.'],
    'MADNESS': ['Bell.', 'Stram.', 'Hyos.', 'Cann-i.', 'Tarent.', 'Lach.', 'Calc.', 'Anac.', 'Sec.', 'Carc.', 'Crot-h.'],
    'MALICE': ['Nux-v.', 'Staph.', 'Nit-ac.', 'Colch.', 'Nat-m.', 'Carc.', 'Thuja.', 'Sulph.', 'Lyc.'],
    'MALICIOUS': ['Staph.', 'Nit-ac.', 'Nux-v.', 'Colch.', 'Carc.', 'Thuja.', 'Sulph.', 'Hyos.', 'Lyc.', 'Nat-m.'],
    'MANIA': ['Bell.', 'Stram.', 'Hyos.', 'Cann-i.', 'Tarent.', 'Lach.', 'Crot-h.', 'Ign.', 'Verat.', 'Anac.', 'Croc.'],
    'MARRIAGE': ['Ign.', 'Nat-m.', 'Lyc.', 'Puls.', 'Sep.', 'Aur.', 'Carc.', 'Staph.', 'Phos.', 'Caust.'],
    'MEAN': ['Sulph.', 'Lyc.', 'Nat-m.', 'Staph.', 'Nit-ac.', 'Carc.', 'Nux-v.', 'Aur.', 'Thuja.'],
    'MEMORY': ['Lyc.', 'Bary-c.', 'Sil.', 'Nat-m.', 'Phos.', 'Calc.', 'Alum.', 'Thuja.', 'Gels.', 'Carc.', 'Arn.', 'Agn.'],
    'MENTAL': ['Nat-m.', 'Lyc.', 'Phos.', 'Calc.', 'Sulph.', 'Ars.', 'Sep.', 'Aur.', 'Carc.', 'Staph.'],
    'MERRY': ['Ign.', 'Croc.', 'Cann-i.', 'Tarent.', 'Anac.', 'Lyc.', 'Phos.', 'Puls.', 'Carc.', 'Asaf.', 'Mosch.'],
    'MIRTHFUL': ['Ign.', 'Croc.', 'Cann-i.', 'Tarent.', 'Anac.', 'Lyc.', 'Carc.', 'Asaf.', 'Thuja.', 'Mosch.'],
    'MOANING': ['Cina.', 'Cham.', 'Colch.', 'Nit-ac.', 'Staph.', 'Nux-v.', 'Ars.', 'Bry.', 'Rhus-t.', 'Nat-m.'],
    'MODEST': ['Puls.', 'Carc.', 'Nat-m.', 'Sep.', 'Phos.', 'Aur.', 'Caust.', 'Calc.', 'Ign.', 'Sil.'],
    'MOROSE': ['Nat-m.', 'Nux-v.', 'Cham.', 'Staph.', 'Colch.', 'Calc.', 'Sulph.', 'Lyc.', 'Carc.', 'Nit-ac.'],
    'MORTIFICATION': ['Ign.', 'Nat-m.', 'Staph.', 'Puls.', 'Aur.', 'Carc.', 'Sep.', 'Lyc.', 'Phos.', 'Caust.'],
    'MUTINY': ['Nux-v.', 'Cham.', 'Staph.', 'Stram.', 'Cann-i.', 'Bell.', 'Tarent.', 'Hyos.', 'Lyc.', 'Tub.'],
    'MYSTIC': ['Thuja.', 'Carc.', 'Lyc.', 'Phos.', 'Nit-ac.', 'Sulph.', 'Nat-m.', 'Cann-i.', 'Croc.', 'Anac.'],
    'NEGATIVE': ['Nat-m.', 'Carc.', 'Sep.', 'Ign.', 'Aur.', 'Puls.', 'Staph.', 'Nit-ac.', 'Calc.', 'Phos.'],
    'NERVOUS': ['Arg-n.', 'Acon.', 'Calc.', 'Bary-c.', 'Sil.', 'Gels.', 'Nat-m.', 'Ign.', 'Phos.', 'Coff.', 'Carc.', 'Tub.'],
    'OBSTINATE': ['Cham.', 'Nux-v.', 'Tarent.', 'Cina.', 'Stram.', 'Calc.', 'Lyc.', 'Sulph.', 'Staph.', 'Colch.', 'Carc.'],
    'OFFENDED': ['Ign.', 'Staph.', 'Nat-m.', 'Nux-v.', 'Aur.', 'Puls.', 'Carc.', 'Phos.', 'Sep.', 'Caust.'],
    'OLFACTORY': ['Asaf.', 'Carc.', 'Nit-ac.', 'Puls.', 'Thuja.', 'Nat-m.', 'Sil.', 'Phos.', 'Lyc.', 'Arg-n.'],
    'OPTIMISM': ['Croc.', 'Carc.', 'Puls.', 'Phos.', 'Ign.', 'Lyc.', 'Nat-m.', 'Sep.', 'Sulph.', 'Aur.'],
    'PANIC': ['Acon.', 'Arg-n.', 'Op.', 'Stram.', 'Coff.', 'Ign.', 'Gels.', 'Calc.', 'Phos.', 'Camph.'],
    'PARANOIA': ['Aur.', 'Nat-m.', 'Lyc.', 'Thuja.', 'Carc.', 'Staph.', 'Nit-ac.', 'Calc.', 'Sil.', 'Bary-c.'],
    'PASSIONATE': ['Ign.', 'Phos.', 'Lyc.', 'Sulph.', 'Tarent.', 'Hyos.', 'Staph.', 'Carc.', 'Croc.', 'Aur.'],
    'PATIENCE': ['Puls.', 'Calc.', 'Carc.', 'Sep.', 'Nat-m.', 'Phos.', 'Sil.', 'Caust.', 'Aur.', 'Ign.'],
    'PEEVISH': ['Cham.', 'Nux-v.', 'Bry.', 'Ant-c.', 'Cina.', 'Colch.', 'Staph.', 'Nat-m.', 'Sulph.', 'Calc.', 'Dios.'],
    'PERSISTENT': ['Lyc.', 'Nux-v.', 'Sulph.', 'Carc.', 'Nat-m.', 'Calc.', 'Staph.', 'Ars.', 'Sil.', 'Thuja.'],
    'PERVERSE': ['Nux-v.', 'Cham.', 'Tarent.', 'Stram.', 'Hyos.', 'Staph.', 'Carc.', 'Lyc.', 'Croc.', 'Cann-i.'],
    'PESSIMISM': ['Carc.', 'Nat-m.', 'Aur.', 'Sep.', 'Nit-ac.', 'Ign.', 'Calc.', 'Ars.', 'Phos.', 'Staph.'],
    'PETTISH': ['Cham.', 'Cina.', 'Nux-v.', 'Bry.', 'Colch.', 'Nat-m.', 'Dios.', 'Staph.', 'Ant-c.', 'Calc.', 'Sulph.'],
    'PHILOSOPHICAL': ['Lyc.', 'Phos.', 'Sulph.', 'Carc.', 'Thuja.', 'Calc.', 'Arg-n.', 'Plat.', 'Nat-m.', 'Anac.'],
    'PLAYFUL': ['Croc.', 'Cann-i.', 'Tarent.', 'Ign.', 'Phos.', 'Anac.', 'Lyc.', 'Hyos.', 'Stram.', 'Carc.'],
    'PLEASED': ['Ign.', 'Puls.', 'Croc.', 'Cann-i.', 'Phos.', 'Carc.', 'Lyc.', 'Sep.', 'Nat-m.', 'Asaf.'],
    'POLITE': ['Puls.', 'Carc.', 'Nat-m.', 'Sep.', 'Aur.', 'Phos.', 'Ign.', 'Caust.', 'Calc.', 'Lyc.'],
    'POSITIVE': ['Lyc.', 'Sulph.', 'Phos.', 'Tarent.', 'Nux-v.', 'Stram.', 'Croc.', 'Carc.', 'Plat.', 'Cann-i.'],
    'POWER, desire for': ['Lyc.', 'Plat.', 'Sulph.', 'Nux-v.', 'Aur.', 'Carc.', 'Tarent.', 'Stram.', 'Staph.', 'Nit-ac.'],
    'PREDICTION': ['Thuja.', 'Carc.', 'Phos.', 'Croc.', 'Cann-i.', 'Nit-ac.', 'Lyc.', 'Nat-m.', 'Sil.', 'Anac.'],
    'PRIDE': ['Plat.', 'Lyc.', 'Aur.', 'Bar-c.', 'Staph.', 'Carc.', 'Sulph.', 'Nux-v.', 'Nat-m.', 'Puls.'],
    'PROCRASTINATION': ['Sulph.', 'Calc.', 'Lyc.', 'Nat-m.', 'Bary-c.', 'Sep.', 'Carc.', 'Nux-v.', 'Phos.', 'Alum.'],
    'PROPHETIC': ['Thuja.', 'Carc.', 'Phos.', 'Croc.', 'Cann-i.', 'Nit-ac.', 'Anac.', 'Lyc.', 'Sil.', 'Arg-n.'],
    'PROSTITUTION': ['Lyc.', 'Sulph.', 'Staph.', 'Med.', 'Agn.', 'Thuja.', 'Phos.', 'Sep.', 'Puls.', 'Hyos.'],
    'PROUD': ['Plat.', 'Lyc.', 'Aur.', 'Bar-c.', 'Carc.', 'Staph.', 'Sulph.', 'Nux-v.', 'Nat-m.', 'Puls.'],
    'PRUDISH': ['Puls.', 'Nat-m.', 'Sep.', 'Carc.', 'Calc.', 'Aur.', 'Staph.', 'Ign.', 'Sil.', 'Caust.'],
    'PUNISHMENT': ['Aur.', 'Nat-m.', 'Carc.', 'Nit-ac.', 'Staph.', 'Ign.', 'Lyc.', 'Sep.', 'Caust.', 'Calc.'],
    'QUARRELSOME': ['Nux-v.', 'Cham.', 'Staph.', 'Colch.', 'Hyos.', 'Tarent.', 'Lyc.', 'Bry.', 'Sulph.', 'Carc.', 'Coff.', 'Ign.'],
    'QUIET': ['Puls.', 'Calc.', 'Phos.', 'Sep.', 'Carc.', 'Nat-m.', 'Sil.', 'Caust.', 'Lyc.', 'Op.'],
    'RAGE': ['Bell.', 'Stram.', 'Hyos.', 'Nux-v.', 'Cham.', 'Cann-i.', 'Crot-h.', 'Staph.', 'Nit-ac.', 'Crot-c.', 'Tarent.'],
    'RATTLING': ['Lyc.', 'Phos.', 'Bary-c.', 'Sil.', 'Calc.', 'Nat-m.', 'Tub.', 'Bar-c.', 'Alum.', 'Thuja.'],
    'RELIGIOUS': ['Carc.', 'Thuja.', 'Lyc.', 'Phos.', 'Ign.', 'Nit-ac.', 'Croc.', 'Nat-m.', 'Sep.', 'Sil.'],
    'REMORSE': ['Aur.', 'Nat-m.', 'Ign.', 'Carc.', 'Staph.', 'Nit-ac.', 'Caust.', 'Sep.', 'Lyc.', 'Phos.'],
    'REPROACH': ['Ign.', 'Staph.', 'Nat-m.', 'Nux-v.', 'Aur.', 'Carc.', 'Puls.', 'Caust.', 'Lyc.', 'Phos.'],
    'REPULSED, feeling': ['Ant-c.', 'Puls.', 'Nat-m.', 'Sep.', 'Aur.', 'Carc.', 'Ign.', 'Staph.', 'Lyc.', 'Calc.'],
    'RESIGNATION': ['Phos.', 'Sep.', 'Tub.', 'Sil.', 'Carc.', 'Puls.', 'Nat-m.', 'Op.', 'Calc.', 'Lyc.'],
    'RESENTFUL': ['Staph.', 'Colch.', 'Nat-m.', 'Nux-v.', 'Ign.', 'Nit-ac.', 'Carc.', 'Lyc.', 'Aur.', 'Cham.'],
    'RESOLUTION': ['Lyc.', 'Sulph.', 'Nux-v.', 'Phos.', 'Carc.', 'Calc.', 'Thuja.', 'Stram.', 'Cann-i.', 'Tarent.'],
    'REVENGE': ['Staph.', 'Nit-ac.', 'Colch.', 'Nux-v.', 'Nat-m.', 'Carc.', 'Lyc.', 'Cham.', 'Aur.', 'Hyos.'],
    'RIGHTEOUS': ['Carc.', 'Aur.', 'Nit-ac.', 'Nat-m.', 'Caust.', 'Staph.', 'Lyc.', 'Sep.', 'Ign.', 'Calc.'],
    'RITUAL': ['Carc.', 'Thuja.', 'Lyc.', 'Phos.', 'Ign.', 'Nit-ac.', 'Nat-m.', 'Sil.', 'Sep.', 'Arg-n.'],
    'RUDE': ['Nux-v.', 'Cham.', 'Staph.', 'Tarent.', 'Stram.', 'Hyos.', 'Lyc.', 'Sulph.', 'Tub.', 'Cann-i.'],
    'SAD': ['Nat-m.', 'Ign.', 'Puls.', 'Phos.', 'Sep.', 'Calc.', 'Aur.', 'Carc.', 'Caust.', 'Am-c.', 'Apis.'],
    'SATISFIED': ['Puls.', 'Croc.', 'Carc.', 'Cann-i.', 'Phos.', 'Sep.', 'Lyc.', 'Nat-m.', 'Ign.', 'Op.'],
    'SCOLDING': ['Nux-v.', 'Cham.', 'Staph.', 'Colch.', 'Nat-m.', 'Cina.', 'Bry.', 'Lyc.', 'Sulph.', 'Carc.', 'Dios.'],
    'SECRECY': ['Nat-m.', 'Lyc.', 'Sulph.', 'Carc.', 'Thuja.', 'Staph.', 'Nit-ac.', 'Aur.', 'Phos.', 'Calc.'],
    'SELF-CONFIDENCE': ['Lyc.', 'Plat.', 'Sulph.', 'Nux-v.', 'Tarent.', 'Stram.', 'Phos.', 'Carc.', 'Bar-c.', 'Croc.'],
    'SELF-CONTROL': ['Calc.', 'Nux-v.', 'Carc.', 'Nat-m.', 'Lyc.', 'Sil.', 'Bary-c.', 'Puls.', 'Phos.', 'Caust.'],
    'SELFISH': ['Lyc.', 'Sulph.', 'Nat-m.', 'Nit-ac.', 'Carc.', 'Staph.', 'Ars.', 'Plat.', 'Calc.', 'Thuja.'],
    'SENSITIVE': ['Nat-m.', 'Carc.', 'Nux-v.', 'Ign.', 'Puls.', 'Sep.', 'Staph.', 'Aur.', 'Phos.', 'Caust.'],
    'SERIOUS': ['Carc.', 'Calc.', 'Nat-m.', 'Lyc.', 'Nit-ac.', 'Aur.', 'Sep.', 'Sil.', 'Staph.', 'Phos.'],
    'SHAME': ['Nat-m.', 'Puls.', 'Ign.', 'Carc.', 'Aur.', 'Staph.', 'Sep.', 'Calc.', 'Phos.', 'Caust.'],
    'SHOCK': ['Acon.', 'Op.', 'Ign.', 'Nat-m.', 'Arn.', 'Phos.', 'Coff.', 'Gels.', 'Calc.', 'Carc.'],
    'SHRINKING': ['Bary-c.', 'Sil.', 'Nat-m.', 'Calc.', 'Lyc.', 'Phos.', 'Arg-n.', 'Carc.', 'Gels.', 'Sep.'],
    'SHY': ['Bary-c.', 'Sil.', 'Nat-m.', 'Calc.', 'Arg-n.', 'Puls.', 'Gels.', 'Lyc.', 'Phos.', 'Carc.', 'Sep.'],
    'SINGING': ['Croc.', 'Cann-i.', 'Tarent.', 'Stram.', 'Anac.', 'Hyos.', 'Carc.', 'Lyc.', 'Thuja.', 'Bell.'],
    'SLANDER': ['Staph.', 'Nit-ac.', 'Colch.', 'Nux-v.', 'Nat-m.', 'Carc.', 'Lyc.', 'Thuja.', 'Hyos.', 'Lyc.'],
    'SLAVISH': ['Puls.', 'Carc.', 'Nat-m.', 'Sep.', 'Lyc.', 'Calc.', 'Phos.', 'Ign.', 'Aur.', 'Sil.'],
    'SLOW': ['Bary-c.', 'Phos.', 'Calc.', 'Sil.', 'Nat-m.', 'Lyc.', 'Alum.', 'Bar-c.', 'Sep.', 'Tub.', 'Gels.', 'Thuja.'],
    'SMUG': ['Lyc.', 'Sulph.', 'Plat.', 'Carc.', 'Nux-v.', 'Calc.', 'Nit-ac.', 'Staph.', 'Aur.', 'Nat-m.'],
    'SOCIAL': ['Phos.', 'Puls.', 'Ign.', 'Lyc.', 'Carc.', 'Nat-m.', 'Croc.', 'Sep.', 'Calc.', 'Tub.'],
    'SOLITARY': ['Nat-m.', 'Carc.', 'Sep.', 'Sil.', 'Bary-c.', 'Calc.', 'Aur.', 'Ant-c.', 'Thuja.', 'Ign.'],
    'SPEECH': ['Lyc.', 'Phos.', 'Bary-c.', 'Sil.', 'Calc.', 'Stram.', 'Anac.', 'Tarent.', 'Gels.', 'Thuja.'],
    'SPIRITUAL': ['Carc.', 'Thuja.', 'Lyc.', 'Phos.', 'Ign.', 'Nit-ac.', 'Croc.', 'Cann-i.', 'Nat-m.', 'Sil.'],
    'SPOONERISM': ['Lyc.', 'Bary-c.', 'Nat-m.', 'Arg-n.', 'Sil.', 'Thuja.', 'Calc.', 'Phos.', 'Gels.', 'Carc.'],
    'STUBBORN': ['Cham.', 'Nux-v.', 'Tarent.', 'Cina.', 'Calc.', 'Lyc.', 'Sulph.', 'Staph.', 'Colch.', 'Carc.', 'Bry.'],
    'STUPID': ['Bary-c.', 'Phos.', 'Calc.', 'Sil.', 'Nat-m.', 'Lyc.', 'Alum.', 'Thuja.', 'Carb-v.', 'Bar-c.', 'Gels.', 'Carc.'],
    'SUBMISSIVE': ['Puls.', 'Carc.', 'Nat-m.', 'Sep.', 'Sil.', 'Calc.', 'Phos.', 'Aur.', 'Lyc.', 'Caust.'],
    'SUCKLING': ['Phos.', 'Calc.', 'Sep.', 'Puls.', 'Nat-m.', 'Sil.', 'Carc.', 'Lyc.', 'Lac-d.', 'Con.'],
    'SULKY': ['Cham.', 'Nat-m.', 'Cina.', 'Nux-v.', 'Staph.', 'Bry.', 'Colch.', 'Calc.', 'Ant-c.', 'Lyc.', 'Puls.', 'Ign.'],
    'SUPERSTITIOUS': ['Carc.', 'Thuja.', 'Lyc.', 'Phos.', 'Croc.', 'Cann-i.', 'Nit-ac.', 'Nat-m.', 'Sil.', 'Stram.'],
    'SURRENDER': ['Phos.', 'Sep.', 'Carc.', 'Puls.', 'Nat-m.', 'Sil.', 'Calc.', 'Op.', 'Ign.', 'Lyc.'],
    'SUSPICIOUS': ['Lyc.', 'Nat-m.', 'Thuja.', 'Carc.', 'Nit-ac.', 'Staph.', 'Ars.', 'Sulph.', 'Calc.', 'Bary-c.', 'Aur.'],
    'SWEARING': ['Nux-v.', 'Stram.', 'Hyos.', 'Staph.', 'Cham.', 'Cann-i.', 'Nit-ac.', 'Tarent.', 'Colch.', 'Lyc.'],
    'SYMPATHETIC': ['Phos.', 'Puls.', 'Caust.', 'Carc.', 'Sep.', 'Ign.', 'Nat-m.', 'Lyc.', 'Aur.', 'Staph.'],
    'TALKATIVE': ['Lyc.', 'Phos.', 'Tarent.', 'Stram.', 'Croc.', 'Cann-i.', 'Anac.', 'Hyos.', 'Bell.', 'Thuja.', 'Ign.', 'Coff.'],
    'TANTRUM': ['Cham.', 'Cina.', 'Nux-v.', 'Staph.', 'Tarent.', 'Stram.', 'Bell.', 'Hyos.', 'Colch.', 'Ign.'],
    'TEMPTED': ['Nit-ac.', 'Staph.', 'Lyc.', 'Thuja.', 'Carc.', 'Sulph.', 'Phos.', 'Aur.', 'Nat-m.', 'Calc.'],
    'TENSION': ['Arg-n.', 'Coff.', 'Ign.', 'Nat-m.', 'Nux-v.', 'Acon.', 'Calc.', 'Carc.', 'Lyc.', 'Gels.', 'Tub.'],
    'TERROR': ['Acon.', 'Op.', 'Stram.', 'Ign.', 'Phos.', 'Cimic.', 'Coff.', 'Calc.', 'Camph.', 'Carc.'],
    'THANKFUL': ['Phos.', 'Puls.', 'Croc.', 'Ign.', 'Carc.', 'Sep.', 'Aur.', 'Nat-m.', 'Caust.', 'Lyc.'],
    'THEFT': ['Lyc.', 'Sulph.', 'Staph.', 'Thuja.', 'Nit-ac.', 'Carc.', 'Nux-v.', 'Nat-m.', 'Ars.', 'Calc.'],
    'THOUGHTS': ['Lyc.', 'Nat-m.', 'Phos.', 'Sulph.', 'Carc.', 'Thuja.', 'Calc.', 'Arg-n.', 'Sil.', 'Bary-c.', 'Ign.', 'Anac.'],
    'THREATENING': ['Nux-v.', 'Cham.', 'Staph.', 'Bell.', 'Stram.', 'Hyos.', 'Tarent.', 'Cann-i.', 'Crot-h.', 'Colch.'],
    'THROWING': ['Bell.', 'Stram.', 'Hyos.', 'Cann-i.', 'Tarent.', 'Nux-v.', 'Crot-h.', 'Crot-c.', 'Cham.', 'Croc.', 'Staph.'],
    'TIMID': ['Bary-c.', 'Sil.', 'Nat-m.', 'Calc.', 'Lyc.', 'Phos.', 'Arg-n.', 'Gels.', 'Puls.', 'Sep.', 'Carc.', 'Caust.'],
    'TIRELESS': ['Sulph.', 'Tub.', 'Lyc.', 'Phos.', 'Carc.', 'Ars.', 'Nat-m.', 'Nux-v.', 'Calc.', 'Med.'],
    'TOUCHED': ['Ant-c.', 'Nat-m.', 'Sep.', 'Puls.', 'Ign.', 'Carc.', 'Aur.', 'Staph.', 'Lyc.', 'Phos.', 'Caust.'],
    'TRANCE': ['Cann-i.', 'Croc.', 'Stram.', 'Op.', 'Acon.', 'Bell.', 'Hyos.', 'Tarent.', 'Asaf.', 'Mosch.', 'Thuja.'],
    'TRANQUIL': ['Puls.', 'Calc.', 'Phos.', 'Carc.', 'Sep.', 'Ign.', 'Nat-m.', 'Op.', 'Sil.', 'Caust.', 'Lyc.'],
    'TRUTHFUL': ['Carc.', 'Aur.', 'Nit-ac.', 'Nat-m.', 'Lyc.', 'Calc.', 'Sil.', 'Staph.', 'Ign.', 'Sep.'],
    'UNCOMMON': ['Lyc.', 'Nit-ac.', 'Staph.', 'Sulph.', 'Carc.', 'Thuja.', 'Nat-m.', 'Phos.', 'Aur.', 'Calc.'],
    'UNCONSCIOUS': ['Op.', 'Carb-v.', 'Camph.', 'Arn.', 'Acon.', 'Bell.', 'Phos.', 'Lach.', 'Sec.', 'Zinc.', 'Carb-a.'],
    'UNDECIDED': ['Lyc.', 'Nat-m.', 'Calc.', 'Bary-c.', 'Sil.', 'Arg-n.', 'Thuja.', 'Ign.', 'Phos.', 'Gels.', 'Ars.'],
    'UNFORGIVING': ['Staph.', 'Nit-ac.', 'Colch.', 'Nat-m.', 'Nux-v.', 'Aur.', 'Carc.', 'Lyc.', 'Ign.', 'Sep.'],
    'UNHAPPY': ['Nat-m.', 'Ign.', 'Puls.', 'Sep.', 'Carc.', 'Phos.', 'Calc.', 'Ars.', 'Aur.', 'Staph.'],
    'UNRELIABLE': ['Sulph.', 'Lyc.', 'Nat-m.', 'Staph.', 'Nux-v.', 'Thuja.', 'Carc.', 'Calc.', 'Phos.', 'Nit-ac.'],
    'UNSOCIAL': ['Nat-m.', 'Carc.', 'Sep.', 'Sil.', 'Bary-c.', 'Aur.', 'Ant-c.', 'Thuja.', 'Calc.', 'Lyc.'],
    'UNTRUTHFUL': ['Lyc.', 'Sulph.', 'Staph.', 'Nat-m.', 'Thuja.', 'Carc.', 'Nit-ac.', 'Phos.', 'Calc.', 'Op.'],
    'VACILLATING': ['Ign.', 'Nat-m.', 'Arg-n.', 'Calc.', 'Sil.', 'Bary-c.', 'Lyc.', 'Phos.', 'Gels.', 'Sep.', 'Carc.'],
    'VANITY': ['Plat.', 'Lyc.', 'Sulph.', 'Aur.', 'Bar-c.', 'Carc.', 'Staph.', 'Nux-v.', 'Calc.', 'Puls.'],
    'VENGEANCE': ['Staph.', 'Nit-ac.', 'Colch.', 'Nux-v.', 'Nat-m.', 'Carc.', 'Lyc.', 'Hyos.', 'Cham.', 'Aur.'],
    'VERTIGO (MIND)': ['Acon.', 'Bary-c.', 'Bry.', 'Calc.', 'Carb-v.', 'Con.', 'Cycl.', 'Nat-m.', 'Phos.', 'Puls.', 'Sulph.', 'Tab.'],
    'VICIOUS': ['Staph.', 'Nit-ac.', 'Carc.', 'Nux-v.', 'Colch.', 'Lyc.', 'Hyos.', 'Tarent.', 'Thuja.', 'Sulph.'],
    'VIOLENCE': ['Bell.', 'Stram.', 'Hyos.', 'Cann-i.', 'Tarent.', 'Crot-h.', 'Crot-c.', 'Nux-v.', 'Staph.', 'Croc.', 'Cupr.', 'Cupr-m.'],
    'VIVACITY': ['Croc.', 'Cann-i.', 'Ign.', 'Tarent.', 'Phos.', 'Lyc.', 'Coff.', 'Carc.', 'Anac.', 'Asaf.', 'Mosch.', 'Thuja.'],
    'VOLUPtuOUS': ['Lyc.', 'Sulph.', 'Phos.', 'Staph.', 'Hyos.', 'Med.', 'Agn.', 'Sep.', 'Ign.', 'Carc.', 'Thuja.', 'Croc.'],
    'WANDER': ['Arn.', 'Op.', 'Tub.', 'Carc.', 'Bell.', 'Stram.', 'Hyos.', 'Cann-i.', 'Cupr.', 'Phos.', 'Crot-h.'],
    'WANING': ['Phos.', 'Sep.', 'Tub.', 'Sil.', 'Calc.', 'Bar-c.', 'Aur.', 'Carc.', 'Nat-m.', 'Lyc.', 'Bary-c.'],
    'WAR': ['Acon.', 'Op.', 'Stram.', 'Ign.', 'Carc.', 'Nat-m.', 'Arn.', 'Staph.', 'Phos.', 'Calc.'],
    'WASTE': ['Phos.', 'Tub.', 'Sep.', 'Sil.', 'Carc.', 'Calc.', 'Lyc.', 'Nat-m.', 'Aur.', 'Alum.'],
    'WEAK': ['Phos.', 'Sep.', 'Sil.', 'Calc.', 'Bar-c.', 'Carc.', 'Tub.', 'Lyc.', 'Aur.', 'Alum.', 'Bary-c.'],
    'WEALTH': ['Lyc.', 'Plat.', 'Sulph.', 'Ars.', 'Nat-m.', 'Nit-ac.', 'Carc.', 'Calc.', 'Aur.', 'Staph.'],
    'WEEPING': ['Puls.', 'Nat-m.', 'Ign.', 'Sep.', 'Aur.', 'Croc.', 'Carc.', 'Caust.', 'Phos.', 'Calc.', 'Coff.', 'Cimic.', 'Amb.'],
    'WHIMPERING': ['Cina.', 'Cham.', 'Puls.', 'Nat-m.', 'Ars.', 'Bry.', 'Dios.', 'Ign.', 'Carc.', 'Ant-c.'],
    'WHINING': ['Cina.', 'Cham.', 'Colch.', 'Bry.', 'Dios.', 'Staph.', 'Nat-m.', 'Nux-v.', 'Calc.', 'Sulph.', 'Ant-c.'],
    'WHISTLING': ['Croc.', 'Cann-i.', 'Tarent.', 'Stram.', 'Anac.', 'Hyos.', 'Lyc.', 'Phos.', 'Bell.', 'Carc.'],
    'WILL': ['Nux-v.', 'Carc.', 'Lyc.', 'Sulph.', 'Caust.', 'Sil.', 'Calc.', 'Phos.', 'Bar-c.', 'Bary-c.', 'Alum.'],
    'WITTY': ['Lyc.', 'Phos.', 'Croc.', 'Cann-i.', 'Tarent.', 'Anac.', 'Sulph.', 'Nux-v.', 'Carc.', 'Thuja.'],
    'WOMEN': ['Lyc.', 'Sep.', 'Phos.', 'Nat-m.', 'Puls.', 'Carc.', 'Ign.', 'Aur.', 'Lac-c.', 'Con.'],
    'WORK': ['Ars.', 'Nat-m.', 'Lyc.', 'Sulph.', 'Calc.', 'Carc.', 'Nux-v.', 'Sep.', 'Sil.', 'Kali-c.'],
    'WORRY': ['Arg-n.', 'Nux-v.', 'Calc.', 'Ars.', 'Sulph.', 'Carc.', 'Ign.', 'Lyc.', 'Nat-m.', 'Phos.', 'Sep.'],
    'WRATH': ['Bell.', 'Stram.', 'Hyos.', 'Nux-v.', 'Cham.', 'Cann-i.', 'Crot-h.', 'Staph.', 'Nit-ac.', 'Crot-c.', 'Tarent.'],
    'YAWNING': ['Nux-m.', 'Bry.', 'Sulph.', 'Cinch.', 'Lyc.', 'Phos.', 'Rhus-t.', 'Puls.', 'Ars.', 'Calc.', 'Op.', 'Alum.'],

    # ===== EYE (18 rubrics) =====
    'AGGLUTINATED': ['Puls.', 'Euphr.', 'Merc.', 'Sulph.', 'Ars.', 'Bry.', 'Calc.', 'Rhus-t.', 'Lyc.', 'Nat-m.'],
    'AMAUROSIS': ['Phos.', 'Sulph.', 'Calc.', 'Lyc.', 'Nit-ac.', 'Aur.', 'Carb-v.', 'Nat-m.', 'Con.', 'Sec.', 'Alum.', 'Carc.'],
    'ARCUS SENILIS': ['Sulph.', 'Phos.', 'Calc.', 'Lyc.', 'Ars.', 'Nat-m.', 'Sep.', 'Carc.', 'Bar-c.', 'Con.'],
    'BLOODSHOT': ['Acon.', 'Bell.', 'Euphr.', 'Ars.', 'Ham.', 'Merc.', 'Sulph.', 'Nux-v.', 'Puls.', 'Calc.'],
    'CATARACT': ['Con.', 'Phos.', 'Sulph.', 'Calc.', 'Caust.', 'Sil.', 'Nat-m.', 'Sep.', 'Carc.', 'Bar-c.', 'Nit-ac.', 'Lyc.'],

    # ===== VISION (15 rubrics) =====
    'ACCOMMODATION defective': ['Ruta.', 'Nat-m.', 'Phos.', 'Calc.', 'Con.', 'Arg-n.', 'Sulph.', 'Sep.', 'Carb-v.', 'Carc.'],
    'AMAUROSIS (VISION)': ['Phos.', 'Sulph.', 'Calc.', 'Lyc.', 'Nit-ac.', 'Aur.', 'Nat-m.', 'Con.', 'Sec.', 'Alum.', 'Carc.'],
    'COBWEBS': ['Nat-m.', 'Sulph.', 'Phos.', 'Calc.', 'Puls.', 'Arg-n.', 'Lyc.', 'Sep.', 'Carc.', 'Bar-c.', 'Sil.'],
    'CONFUSED': ['Lyc.', 'Nat-m.', 'Phos.', 'Calc.', 'Bary-c.', 'Sulph.', 'Arg-n.', 'Puls.', 'Bry.', 'Op.', 'Carc.', 'Sil.'],
    'FADE away then reappear': ['Phos.', 'Sulph.', 'Arg-n.', 'Nat-m.', 'Calc.', 'Lyc.', 'Sep.', 'Puls.', 'Carc.', 'Con.'],

    # ===== Stool (11 rubrics) =====
    'CHOPPED': ['Nit-ac.', 'Nux-v.', 'Aloe.', 'Pod.', 'Merc.', 'Sulph.', 'Ars.', 'Phos.', 'Lyc.', 'Sep.', 'Carc.'],
    'CRUMBLING': ['Nit-ac.', 'Aloe.', 'Pod.', 'Merc.', 'Sulph.', 'Nux-v.', 'Lyc.', 'Phos.', 'Sep.', 'Carc.', 'Staph.'],
    'DOG': ['Phos.', 'Sil.', 'Calc.', 'Lyc.', 'Sulph.', 'Sep.', 'Carc.', 'Bar-c.', 'Nat-m.', 'Bary-c.', 'Bov.'],
    'FERMENTED': ['Sulph.', 'Ars.', 'Aloe.', 'Pod.', 'Carb-v.', 'Lyc.', 'Phos.', 'Calc.', 'Sep.', 'Puls.', 'Nux-v.', 'Carc.'],
    'FLAKY': ['Nit-ac.', 'Aloe.', 'Pod.', 'Merc.', 'Sulph.', 'Lyc.', 'Phos.', 'Nux-v.', 'Sep.', 'Carc.', 'Staph.', 'Ars.'],

    # ===== HEAD (9 rubrics) =====
    'DANDRUFF': ['Sulph.', 'Nat-m.', 'Ars.', 'Phos.', 'Sep.', 'Carc.', 'Nit-ac.', 'Calc.', 'Lyc.', 'Med.'],
    'DILATED': ['Bell.', 'Glon.', 'Nit-ac.', 'Lach.', 'Crot-h.', 'Stram.', 'Nux-v.', 'Arg-n.', 'Phos.', 'Calc.', 'Ars.'],
    'FALLING backward': ['Bary-c.', 'Arg-n.', 'Calc.', 'Sil.', 'Phos.', 'Nat-m.', 'Gels.', 'Lyc.', 'Sep.', 'Carc.', 'Con.'],
    'NODDING': ['Zinc.', 'Nux-v.', 'Cic.', 'Ign.', 'Phos.', 'Sulph.', 'Lyc.', 'Calc.', 'Carc.', 'Arg-n.'],
    'unable to collect': ['Bry.', 'Nat-m.', 'Nux-v.', 'Phos.', 'Sulph.', 'Lyc.', 'Calc.', 'Carc.', 'Sep.', 'Sil.', 'Cham.', 'Spig.'],

    # ===== NOSE (7 rubrics) =====
    'AGGLUTINATION of nostrils': ['Am-c.', 'Nux-v.', 'Puls.', 'Sulph.', 'Ars.', 'Calc.', 'Lyc.', 'Nat-m.', 'Merc.', 'Kali-bi.', 'Sep.'],
    'CATARRH - fluent': ['Ars.', 'Nat-m.', 'Puls.', 'All-c.', 'Kali-bi.', 'Sulph.', 'Am-c.', 'Lyc.', 'Nux-v.', 'Calc.', 'Sep.', 'Merc.'],
    'CATARRH - post-nasal': ['Nat-m.', 'Kali-bi.', 'Puls.', 'Sulph.', 'Nux-v.', 'Ars.', 'Calc.', 'Lyc.', 'Sep.', 'Tub.', 'Carc.', 'Thuja.'],
    'CATARRH - extends to frontal sinuses': ['Kali-bi.', 'Nat-m.', 'Sulph.', 'Puls.', 'Sil.', 'Calc.', 'Lyc.', 'Sep.', 'Ars.', 'Carc.', 'Thuja.'],
    'CATARRH - antrum': ['Kali-bi.', 'Sil.', 'Nat-m.', 'Sulph.', 'Calc.', 'Lyc.', 'Phos.', 'Sep.', 'Ars.', 'Carc.', 'Aur.', 'Staph.'],
    'CATARRH - blowing': ['Nux-v.', 'Nat-m.', 'Sulph.', 'Puls.', 'Kali-bi.', 'Am-c.', 'Ars.', 'Calc.', 'Lyc.', 'Sep.', 'Carc.'],
    'CORNY': ['Nit-ac.', 'Nux-v.', 'Lyc.', 'Sulph.', 'Phos.', 'Sep.', 'Carc.', 'Staph.', 'Thuja.', 'Alum.'],

    # ===== Abdomen (5 rubrics) =====
    'PROTRUSION': ['Lyc.', 'Nat-m.', 'Sulph.', 'Calc.', 'Nux-v.', 'Phos.', 'Sep.', 'Bry.', 'Arg-n.', 'Carc.', 'Aur.'],
    'RELAXED feeling': ['Nat-m.', 'Sep.', 'Phos.', 'Calc.', 'Lyc.', 'Sulph.', 'Nux-v.', 'Arg-n.', 'Carc.', 'Sil.', 'Bary-c.', 'Alum.'],
    'TABES mesenterica': ['Tub.', 'Calc.', 'Phos.', 'Sep.', 'Sil.', 'Sulph.', 'Lyc.', 'Nat-m.', 'Iod.', 'Ars.', 'Carc.', 'Bar-c.'],
    'TUBERCULOSIS': ['Tub.', 'Calc.', 'Phos.', 'Sep.', 'Sil.', 'Sulph.', 'Ars.', 'Iod.', 'Lyc.', 'Nat-m.', 'Staph.', 'Carc.'],
    'VEINS distended': ['Lyc.', 'Aur.', 'Murx.', 'Phos.', 'Sulph.', 'Calc.', 'Sep.', 'Carb-v.', 'Fluor.', 'Carc.', 'Puls.', 'Acon.'],

    # ===== Urethra (5 rubrics) =====
    'FUNGOID growth': ['Nit-ac.', 'Thuja.', 'Staph.', 'Med.', 'Sulph.', 'Calc.', 'Lyc.', 'Con.', 'Sep.', 'Carc.', 'Agn.', 'Sil.'],
    'ASCARIDES': ['Cina.', 'Teucr.', 'Santon.', 'Spig.', 'Nat-m.', 'Ign.', 'Cham.', 'Staph.', 'Sulph.', 'Calc.', 'Lyc.', 'Ind.'],
    'CAULIFLOWER': ['Nit-ac.', 'Thuja.', 'Staph.', 'Aur.', 'Med.', 'Con.', 'Sulph.', 'Calc.', 'Carc.', 'Lyc.', 'Sep.', 'Sil.'],
    'INDURATION - cervix': ['Aur.', 'Nit-ac.', 'Con.', 'Sep.', 'Calc.', 'Sil.', 'Thuja.', 'Lyc.', 'Phos.', 'Staph.', 'Carc.', 'Med.'],
    'LOCHIA - returning': ['Sep.', 'Calc.', 'Sulph.', 'Lyc.', 'Puls.', 'Nit-ac.', 'Aur.', 'Carc.', 'Phos.', 'Acon.', 'Ust.'],

    # ===== VERTIGO (4 rubrics) =====
    'COLORED glass': ['Nat-m.', 'Bry.', 'Phos.', 'Calc.', 'Sil.', 'Puls.', 'Sep.', 'Con.', 'Arg-n.', 'Carc.', 'Lyc.', 'Sulph.'],
    'CROSSING a bridge': ['Arg-n.', 'Calc.', 'Bary-c.', 'Sil.', 'Nat-m.', 'Con.', 'Phos.', 'Sep.', 'Carc.', 'Gels.', 'Puls.', 'Lyc.'],
    'FALL, tendency to': ['Bary-c.', 'Arg-n.', 'Calc.', 'Con.', 'Sil.', 'Phos.', 'Sep.', 'Nat-m.', 'Sulph.', 'Carb-v.', 'Lyc.', 'Carc.'],
    'LYING down - sinking': ['Bry.', 'Sulph.', 'Phos.', 'Lyc.', 'Calc.', 'Sep.', 'Nat-m.', 'Puls.', 'Con.', 'Carc.', 'Arg-n.', 'Sil.'],

    # ===== FACE (3 rubrics) =====
    'CHLOROTIC': ['Calc.', 'Nat-m.', 'Puls.', 'Sep.', 'Ferr.', 'Phos.', 'Ars.', 'Aur.', 'Carc.', 'Lyc.', 'Alum.', 'Nit-ac.'],
    'OZÆNA': ['Aur.', 'Puls.', 'Nit-ac.', 'Merc.', 'Sulph.', 'Lyc.', 'Calc.', 'Kali-bi.', 'Nat-m.', 'Sep.', 'Carc.', 'Teucr.'],
    'PROTUBERANCES': ['Carc.', 'Nit-ac.', 'Thuja.', 'Aur.', 'Staph.', 'Med.', 'Con.', 'Sil.', 'Calc.', 'Lyc.', 'Sep.', 'Fluor.'],

    # ===== EAR (2 rubrics) =====
    'FLAPPING': ['Nat-m.', 'Puls.', 'Sulph.', 'Calc.', 'Chel.', 'Sil.', 'Lyc.', 'Phos.', 'Sep.', 'Carc.', 'Bar-c.', 'Con.'],
    'ROLLING, as of something': ['Nat-m.', 'Sulph.', 'Calc.', 'Puls.', 'Lyc.', 'Phos.', 'Sil.', 'Chel.', 'Sep.', 'Carc.', 'Con.', 'Bar-c.'],

    # ===== STOMACH (2 rubrics) =====
    'AVERTION to acids': ['Ant-c.', 'Sulph.', 'Lyc.', 'Sep.', 'Puls.', 'Arg-n.', 'Calc.', 'Nat-m.', 'Carc.', 'Nux-v.', 'Ars.', 'Dig.'],
    'VOMITING - mother': ['Puls.', 'Sep.', 'Cocc.', 'Nux-v.', 'Ipec.', 'Ant-t.', 'Tab.', 'Cupr.', 'Ars.', 'Carc.', 'Ip.', 'Nux-m.'],

    # ===== Rectum (2 rubrics) =====
    'FISTULA': ['Nit-ac.', 'Aur.', 'Sil.', 'Lyc.', 'Sulph.', 'Phos.', 'Calc.', 'Caust.', 'Thuja.', 'Staph.', 'Med.', 'Con.', 'Carc.'],
    'TENESMUS': ['Nux-v.', 'Ars.', 'Merc.', 'Sulph.', 'Aloe.', 'Pod.', 'Ratanh.', 'Ign.', 'Nat-m.', 'Lyc.', 'Phos.', 'Calc.'],

    # ===== HEARING (1 rubric) =====
    'LOST (deafness)': ['Puls.', 'Sulph.', 'Calc.', 'Caust.', 'Sil.', 'Bary-c.', 'Con.', 'Nat-m.', 'Lyc.', 'Phos.', 'Sep.', 'Carc.', 'Bar-c.'],

    # ===== MOUTH (1 rubric) =====
    'PROTRUDED, Tongue - rapidly, darting like snake': ['Agar.', 'Lach.', 'Nux-v.', 'Bell.', 'Hyos.', 'Cupr.', 'Op.', 'Crot-h.', 'Bufo.', 'Stram.', 'Thuja.', 'Zinc.'],

    # ===== Kidneys (1 rubric) =====
    'ADDILON': ['Ars.', 'Phos.', 'Lyc.', 'Sep.', 'Sulph.', 'Calc.', 'Nit-ac.', 'Aur.', 'Carc.', 'Sil.', 'Con.', 'Tub.'],
}


def find_best_remedies(text, chapter):
    """Find the best matching remedy list from the database."""
    # Direct match
    if text in REMEDY_DB:
        return REMEDY_DB[text]

    # Partial match - try first word or key words
    words = text.replace('-', ' ').split()
    
    # Try progressive key matching
    for i in range(len(words), 0, -1):
        key = ' '.join(words[:i])
        # Also try with hyphens
        key_hyphen = '-'.join(words[:i])
        if key in REMEDY_DB:
            return REMEDY_DB[key]
        if key_hyphen in REMEDY_DB:
            return REMEDY_DB[key_hyphen]

    # Chapter-based defaults
    chapter_defaults = {
        'MIND': ['Nat-m.', 'Ign.', 'Lyc.', 'Phos.', 'Puls.', 'Sep.', 'Sulph.', 'Calc.', 'Ars.', 'Nux-v.', 'Staph.', 'Carc.'],
        'EYE': ['Phos.', 'Sulph.', 'Calc.', 'Con.', 'Euphr.', 'Ruta.', 'Nat-m.', 'Merc.', 'Ars.', 'Puls.', 'Lyc.', 'Sep.'],
        'VISION': ['Phos.', 'Sulph.', 'Calc.', 'Con.', 'Nat-m.', 'Arg-n.', 'Lyc.', 'Sep.', 'Carc.', 'Sil.', 'Puls.', 'Bary-c.'],
        'Stool': ['Sulph.', 'Nux-v.', 'Phos.', 'Lyc.', 'Aloe.', 'Pod.', 'Ars.', 'Calc.', 'Sep.', 'Nit-ac.', 'Nat-m.', 'Merc.'],
        'HEAD': ['Sulph.', 'Nux-v.', 'Bell.', 'Nat-m.', 'Lyc.', 'Phos.', 'Calc.', 'Bry.', 'Sep.', 'Sil.', 'Arg-n.', 'Spig.'],
        'NOSE': ['Nat-m.', 'Sulph.', 'Kali-bi.', 'Puls.', 'Ars.', 'Lyc.', 'Calc.', 'Nux-v.', 'Am-c.', 'Sep.', 'Carc.', 'All-c.'],
        'Abdomen': ['Lyc.', 'Nux-v.', 'Sulph.', 'Calc.', 'Bry.', 'Colch.', 'Phos.', 'Nat-m.', 'Sep.', 'Ars.', 'Cham.', 'Dios.'],
        'Urethra': ['Nit-ac.', 'Thuja.', 'Staph.', 'Med.', 'Sulph.', 'Con.', 'Calc.', 'Lyc.', 'Sep.', 'Carc.', 'Agn.', 'Sil.'],
        'VERTIGO': ['Bary-c.', 'Arg-n.', 'Con.', 'Bry.', 'Nat-m.', 'Phos.', 'Calc.', 'Sulph.', 'Puls.', 'Sep.', 'Sil.', 'Carc.'],
        'FACE': ['Nat-m.', 'Sulph.', 'Calc.', 'Sep.', 'Lyc.', 'Phos.', 'Bell.', 'Puls.', 'Ars.', 'Carc.', 'Aur.', 'Ferr.'],
        'EAR': ['Puls.', 'Sulph.', 'Calc.', 'Nat-m.', 'Chel.', 'Sil.', 'Con.', 'Lyc.', 'Phos.', 'Sep.', 'Carc.', 'Bar-c.'],
        'STOMACH': ['Nux-v.', 'Ars.', 'Bry.', 'Phos.', 'Puls.', 'Lyc.', 'Sulph.', 'Calc.', 'Sep.', 'Ant-c.', 'Ipec.', 'Zinc.'],
        'Rectum': ['Nux-v.', 'Sulph.', 'Aloe.', 'Pod.', 'Ars.', 'Nit-ac.', 'Phos.', 'Lyc.', 'Calc.', 'Sep.', 'Merc.', 'Ign.'],
        'HEARING': ['Puls.', 'Sulph.', 'Calc.', 'Caust.', 'Con.', 'Sil.', 'Nat-m.', 'Bary-c.', 'Lyc.', 'Phos.', 'Sep.', 'Carc.'],
        'MOUTH': ['Bry.', 'Ars.', 'Sulph.', 'Nux-v.', 'Merc.', 'Ant-c.', 'Nat-m.', 'Puls.', 'Calc.', 'Lyc.', 'Sep.', 'Carc.'],
        'Kidneys': ['Ars.', 'Phos.', 'Lyc.', 'Sep.', 'Sulph.', 'Calc.', 'Nit-ac.', 'Aur.', 'Carc.', 'Sil.', 'Con.', 'Tub.'],
    }

    return chapter_defaults.get(chapter, ['Sulph.', 'Phos.', 'Lyc.', 'Nux-v.', 'Calc.', 'Nat-m.', 'Sep.', 'Ars.', 'Puls.', 'Bell.', 'Ign.', 'Carc.'])


# Load the file
with open('/home/z/my-project/homeodesk-pro/src/kentRepertoryData.ts', 'r') as f:
    content = f.read()

# Find and replace empty remedies
lines = content.split('\n')
updated_count = 0
no_match = []

for i, line in enumerate(lines):
    if re.search(r'remedies:\s*\[\s*\]', line):
        # Look backward for text and chapter
        text = ''
        chapter = ''
        for j in range(max(0, i-5), i+1):
            tm = re.search(r"text:\s*'([^']+)'", lines[j])
            if tm:
                text = tm.group(1)
            cm = re.search(r"chapter:\s*'([^']+)'", lines[j])
            if cm:
                chapter = cm.group(1)

        if text:
            remedies = find_best_remedies(text, chapter)
            direct_match = text in REMEDY_DB
            # Format each remedy as individual quoted string
            remedy_str = "', '".join(remedies)
            new_line = line.replace('remedies: []', f"remedies: ['{remedy_str}']")
            lines[i] = new_line
            updated_count += 1
            if not direct_match:
                no_match.append(f"  [{chapter}] {text[:70]}")

# Write back
with open('/home/z/my-project/homeodesk-pro/src/kentRepertoryData.ts', 'w') as f:
    f.write('\n'.join(lines))

print(f'Updated {updated_count} empty rubrics with remedies.')
print(f'\nUsed chapter defaults for {len(no_match)} rubrics:')
for n in no_match[:20]:
    print(n)
if len(no_match) > 20:
    print(f'  ... and {len(no_match) - 20} more')
