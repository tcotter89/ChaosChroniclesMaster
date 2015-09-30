SET IDENTITY_INSERT Corporation ON

INSERT INTO Corporation (CorporationID,      Name,                     Description,									                    ImgLogoPath,						  ImgSplashPath,				 ImgAlternatePath,				ImgTrayPath, ImgTurnMarkerPath,						ImgPerkPath,       BonusName,                                 BonusDescription)
                 VALUES (            1, 'Bauhaus', 'The crack shots of the galaxy',									    'corporations/Logo-Bauhaus',      'corporations/Background-Bauhaus',     'corporations/Round-Bauhaus',	   'trays/Tray-Bauhaus',              null,		'corporations/Perk-Bauhaus',   'Crack Shots', 'Roll 1 additional dice in all firearms attacks')
INSERT INTO Corporation (CorporationID,      Name,                                Description,											 ImgLogoPath,						  ImgSplashPath,				 ImgAlternatePath,				ImgTrayPath, ImgTurnMarkerPath,						ImgPerkPath,       BonusName,               BonusDescription)
                 VALUES (            2, 'Imperial', 'Proud warriors of their sovereign queen',						    'corporations/Logo-Imperial',    'corporations/Background-Imperial',    'corporations/Round-Imperial',	  'trays/Tray-Imperial',              null,    'corporations/Perk-Imperial',     'Intuition', 'Gain 1 extra action per turn')
INSERT INTO Corporation (CorporationID,      Name,                              Description,											 ImgLogoPath,						  ImgSplashPath,				 ImgAlternatePath,				ImgTrayPath, ImgTurnMarkerPath,						ImgPerkPath,       BonusName,                      BonusDescription)
                 VALUES (            3, 'Capitol', 'Patriotic zealots that stop at nothing',						     'corporations/Logo-Capitol',     'corporations/Background-Capitol',     'corporations/Round-Capitol',	   'trays/Tray-Capitol',              null,     'corporations/Perk-Capitol',    'Tacticians', 'Start with 1 extra doomtrooper card')
INSERT INTO Corporation (CorporationID,      Name,                 Description,															 ImgLogoPath,						  ImgSplashPath,				 ImgAlternatePath,				ImgTrayPath, ImgTurnMarkerPath,						ImgPerkPath,       BonusName,                BonusDescription)
                 VALUES (            4, 'Mishima', 'The fastest ninjas around',										     'corporations/Logo-Mishima',     'corporations/Background-Mishima',     'corporations/Round-Mishima',	   'trays/Tray-Mishima',              null,     'corporations/Perk-Mishima',     'Fleetfeet', 'Move 1 extra space per action')
INSERT INTO Corporation (CorporationID,          Name,                                                 Description,						 ImgLogoPath,						  ImgSplashPath,				 ImgAlternatePath,				ImgTrayPath, ImgTurnMarkerPath,						ImgPerkPath,       BonusName,                       BonusDescription)
                 VALUES (            5, 'Cybertronic', 'Mechanically-enhanced humans weilding powerful technology',	 'corporations/Logo-Cybertronic', 'corporations/Background-Cybertronic', 'corporations/Round-Cybertronic', 'trays/Tray-Cybertronic',              null, 'corporations/Perk-Cybertronic',   'Power Armor', 'Roll 1 additional die when defending')
INSERT INTO Corporation (CorporationID,          Name,                                                  Description,					 ImgLogoPath,						  ImgSplashPath,				 ImgAlternatePath,				ImgTrayPath, ImgTurnMarkerPath,						ImgPerkPath,       BonusName,                                                         BonusDescription)
                 VALUES (            6, 'Brotherhood', 'Relgious fanatics intent on eradicating the Legion scourge', 'corporations/Logo-Brotherhood', 'corporations/Background-Brotherhood', 'corporations/Round-Brotherhood', 'trays/Tray-Brotherhood',			  null, 'corporations/Perk-Brotherhood',   'Flexibility', 'Use 2 turn markers instead of 1 and pick which turn to take when drawn')
INSERT INTO Corporation (CorporationID,     Name,                                    Description,										 ImgLogoPath,						  ImgSplashPath,				 ImgAlternatePath,				ImgTrayPath, ImgTurnMarkerPath,                     ImgPerkPath,       BonusName,                                    BonusDescription)
                 VALUES (           10, 'Legion', 'The never-ending armies from galaxies beyond',					      'corporations/Logo-Legion',      'corporations/Background-Legion',      'corporations/Round-Legion',					   null,              null,                            null, 'Dark Symmetry', 'The legion needs no bonus with its endless hordes')

SET IDENTITY_INSERT Corporation OFF

UPDATE Corporation 
SET Description = 'Bauhaus is one of the most powerful of the five megacorporations, originating as the result of a European conglomerate dominated by French and German companies. The people of Bauhaus take pride in quality in their products, and they also take pride in heritage. Bauhaus is dominated by several noble families, and each of its major industries is dominated by one family or another. In its military, Bauhaus is a strong believer in quality over quantity ... but when it comes to armored divisions, they have a strong belief in "bigger is better". Bauhaus is the dominant force in tank warfare, as exemplified by the largest tank in their armory, the Grizzly MBT - basically a mobile bunker. Bauhaus weapons are renowned as the most reliable in the system, provided they are cared for properly.'
WHERE Name = 'Bauhaus'

UPDATE Corporation 
SET Description = 'Imperial is the second youngest of the megacorporations. It is a conglomerate of smaller corporations, who banded together to be able to compete with the larger corporations. Imperial is diverse, and seems ready to fall apart at the seams to most outside observers. However, Imperial remains cohesive, and a power factor to be reckoned with. For all the achievements of the Imperial Corporation, their history is forever darkened by events that changed the world of mankind forever. During the pre-Exodus migration from Earth it was the navigational space-faring skills of Imperial that allowed it to rise in power until it was on a par with the other megacorporations. Although the smallest of the corporations their imperialistic nature has allowed them to keep step as the great powers of the solar system jostled for power. Their success is due to the caliber of the common citizens and not to the corporate leadership, which has earned a well-deserved reputation for bad judgment.'
WHERE Name = 'Imperial'

UPDATE Corporation 
SET Description = 'Capitol is one of the five large megacorporations which controll the planets of the Sol system.They are styled after and evolved from the Earth nation of the United States Of America. Capitol was the first corporation to fully appreciate the commercial viability of colonizing the solar system. Taking the initiative they invested a massive amount of resources in the construction of a permanent launch facility and resource depot on the Moon. Their investment paid huge dividends as traffic throughout the solar system increased and all the Megacorporations began using the Capitol base. They developed a reputation for logistical expertise that persists to this day, for their supply lines and rapid deployment record is by far the most impressive of all the corporations. The Capitol Military reflects the emphasis on individuality, which is prevalent in their society at large. They possess a large regular army but the majority of conscripts join up in the firm belief that they are destined for service in one of the special-forces divisions.'
WHERE Name = 'Capitol'

UPDATE Corporation 
SET Description = 'Of all the corporations Mishima holds most closely to the ancient traditions of its origins. They suffered badly during the Fall because so much of their wealth had been accumulated through the design of microprocessors and the generation of powerful AI''s. But as history has repeatedly shown, Mishima has a remarkable capacity for resilience. Their adherence to duty has seen them accomplish many things that other corporations considered impossible, not least of which was the successful settling of the infernal world of Mercury. Of all the corporations they have the most unique mindset. Both rigid and elegant, unforgiving, yet highly prized by even the most lowly of their citizens. It is this introspective way of thought that has led them into much controversy over the centuries. Not least of which the rift that sprang up between Mishima and the Brotherhood during the Neroian Heresy. This division is not entirely healed, even to this day. Following the divergence of Mishima from the teachings of the Cardinal they established the Schools of Enlightenment, which many see as an act of heresy. The Brotherhood however, saw no evidence of the Dark Symmetry in the schools and so tolerated their existence. This was seen by many in the Curia as a wise move as it allowed Mishima to concede the Brotherhood''s spiritual authority without losing face. Others see it as a display of Brotherhood weakness and a sign that Mishima are moving ever closer to the shadow.'
WHERE Name = 'Mishima'

UPDATE Corporation 
SET Description = 'Compared to the other corporations the history of Cybertronic is extremely short. However, in the 160 years since they reached Megacorporation status they have had a huge impact on the solar system. The corporation had its beginnings in a relatively unknown company called Cybertronic Investments Inc., with a dubious reputation for developing technology in violation of Brotherhood directives. In the year 1103 Y.C. they orchestrated a colossal �ghost collapse� of the stock exchange on Luna. Billions of valuable share were unwisely sold only to be bought up by supporters of Cybertronic who suddenly emerged from within all the corporations. The company�s assets soared rapidly and almost overnight a new Megacorporation was born. As the Cybertronic farms continue to deliver citizens at a rate that no other corporation can match the ranks of their military are swelling in step. Many are the rolls that one might fulfill for the corporation but none yield the esteem or the potential rewards of serving in the armed forces.Contrary to what most Cybertronic citizens believe, their soldiers do not always go into battle supported by the finest military hardware to be found in the solar system. It is true that the best that Cybertronic has to offer really is the best there is. However, Cybertronic�s resources and their confidence in their superiority are not as limitless, nor as certain as they would have their citizens believe. As a consequence of this the majority of their troops are sent into battle with equipment that is decidedly average in quality and effectiveness.'
WHERE Name = 'Cybertronic'

UPDATE Corporation 
SET Description = 'Longtime faith-keepers and preachers, the Brotherhood has remained on the outskirts of many of the corporate power-struggles through the years. Now, however, their prophesies are coming true with the exodus of earth and the discovery of �something� beyond the darkness of Pluto. As tales of dread and horror return to Luna from Imperial colonies, people are turning to their faith now, more than ever. Corporation and beggar alike turn to the Brotherhood for guidance towards mankind�s salvation. To work against the Brotherhood is seen as treachery against humankind itself. One might say that the formation of the Brotherhood rewrote the course of history. The Brotherhood was formed in 2275 A.D. by the first Cardinal, Nathaniel Durand, following the end of the First Corporate Wars. Its foundation drew all the corporations together in unity. A new calendar was begun in the year of the Cardinal�s inauguration and dates were henceforth written as Y.C. -In the Year of the Cardinal. From the earliest days of the Brotherhood they have established themselves as a martial force and not simply a clerical order guiding humanity with words of wisdom and peace. The times are too dark, the enemy too prone to slaughter for such a charitable expression of faith. Did not the Cardinal himself lead an army of thousand against the Apostle of War and did he not smite down and cleave into bloody ruin many a hell-spawned demon sent against him. He did; and as in all things, the Brotherhood follows what Cardinal Durand I taught them.'
WHERE Name = 'Brotherhood'

UPDATE Corporation 
SET Description = 'It was the Imperial Conquistadors that discovered and disturbed the Steel Tablet thus releasing the Dark Symmetry into the universe of mankind. But this cannot be seen as an accident, this was no chance discovery. Besides the natural curiosity of man there was something else at work, a hidden force acting on the Conquistadors like the lure of a serpent. When the doomed Conquistador touched the Steel Tablet it was like the toiling of a mighty bell, a resonance going out into the void but it was also a sign, an omen declaring that the fruit of man�s soul was ripe. Swollen by greed, ambition and betrayal the human race had finally proved itself a worthy sacrifice to the Dark Soul. The Dark Symmetry spread throughout our reality warping it to the purpose of the Dark Soul and rendering a large part of human technology so maliciously unreliable that to use it was to court disaster. The Dark Symmetry was only the vanguard, the precursor of the arrival of the Dark Legion itself. In much the same way as mankind altered entire worlds to accommodate his presence, so the Dark Symmetry worked upon the reality of mankind to accommodate the presence of the Dark Soul. Some fifty years later, when the planet Nero was discovered its significance was not recognized, though many were filled with an unreasonable sense of foreboding by its sudden appearance and disturbing presence. The first recorded awareness of the Dark Soul�s existence came from the speeches of a young political and religious activist by the name of Nathaniel Durand. He was the first person to bring the imminent threat of the Dark Legion to public attention. But it wasn�t until some fifty years after his inauguration as Cardinal of the Brotherhood that the Dark Legion launched its first massive assault. The physical presence of the Dark Legion was released into the solar system after the ever-inquisitive Imperial Conquistadors broke the First Seal of Repulsion on the planet Nero. In the year 51 Y.C. the Dark Legion launched a massive attack across the solar system raising up a host of Dark Citadels and bringing new levels of terror to the battlefields of mankind. It was only the Cardinal�s vision and strength of faith that saved mankind from complete annihilation. Leading a combined human force he defeated the Dark Legion during the Venusian Crusade and their presence began to withdraw from the solar system. A brief show of strength by Algeroth�s Nepharite Overlord Saladin on Mars, reminded humanity that the Dark Legion was not completely vanquished but had simply retreated, biding their time before the next and final assault on the soul of mankind. Now after almost twelve hundred years of physical absence they have returned. The Dark Legion is back to finish the task they began so long ago and as the forces of mankind struggle in the grip of the Second Corporate Wars there seems little hope that they shall survive this the ultimate attempt of their worlds, their lives, their very soul.'
WHERE Name = 'Legion'
