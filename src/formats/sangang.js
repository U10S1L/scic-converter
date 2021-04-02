export const generateSangang = (
  name,
  gangClique,
  moniker,
  mdcUrl,
  isA,
  isB,
  isC,
  isD,
  isE,
  isF,
  isG,
  isH,
  evidenceA,
  evidenceB,
  evidenceC,
  evidenceD,
  evidenceE,
  evidenceF,
  evidenceG,
  evidenceH
) => {
  return `[divbox=white]
[center][b][u]SANGANG FILE[/u][/b][/center]
[divbox=black][center][b][color=#FFFFFF]SUBJECT INFO[/color][/b][/center][/divbox]
[divbox=white]
[b]NAME:[/b] ${name}
[b]GANG/CLIQUE:[/b] ${gangClique}
[b]MONIKER:[/b] ${moniker}
[b]MDC:[/b] [url=${mdcUrl}]ACCESS[/URL]
[/divbox]
[divbox=black][center][b][color=#FFFFFF]SECTION 305[/color][/b][/center][/divbox]
[divbox=white]
[b]§ 305 CRITERION[/b]
${
  isA ? "[cbc]" : "[cb]"
} [u]A[/u] - Person has been ruled to be a gang member by a court
${
  isB ? "[cbc]" : "[cb]"
} [u]B[/u] - Person is marked in any permanent way with gang affiliated markings (e.g. tattoos, branding, scaring)
${
  isC ? "[cbc]" : "[cb]"
} [u]C[/u] - Person has admitted to being a gang member (self-proclamation)
${
  isD ? "[cbc]" : "[cb]"
} [u]D[/u] - Person has been arrested with known gang members for offenses consistent with gang activity
${
  isE ? "[cbc]" : "[cb]"
} [u]E[/u] - Person has been identified as a gang member by a reliable confidential informant/source registered by the law enforcement agency
${
  isF ? "[cbc]" : "[cb]"
} [u]F[/u] - Person has been documented associating with recorded gang members
${
  isG ? "[cbc]" : "[cb]"
} [u]G[/u] - Person has been documented displaying gang symbols and/or hand signs
${
  isH ? "[cbc]" : "[cb]"
} [u]H[/u] - Person has been documented by law enforcement frequenting gang areas

[b]§ 305 EVIDENCE[/b]
[altspoiler=A]
${evidenceA}
[/altspoiler]
[altspoiler=B]
${evidenceB}
[/altspoiler]
[altspoiler=C]
${evidenceC}
[/altspoiler]
[altspoiler=D]
${evidenceD}
[/altspoiler]
[altspoiler=E]
${evidenceE}
[/altspoiler]
[altspoiler=F]
${evidenceF}
[/altspoiler]
[altspoiler=G]
${evidenceG}
[/altspoiler]
[altspoiler=H]
${evidenceH}
[/altspoiler]
[/divbox]
[/divbox]`;
};
