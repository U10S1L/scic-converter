export const generatePoi = (imgUrl, mdcUrl, name, race, sex, description) => {
  return `[divbox=white]
[center][u]DETECTIVE BUREAU - PERSON OF INTEREST[/u][/center]
[hr][/hr]
[center]
[img]${imgUrl}[/img]
[url=MDCLINKHERE]${mdcUrl}[/url]
[/center]
[hr][/hr]
[b]NAME:[/b] ${name}
[b]RACE:[/b] ${race}
[b]SEX:[/b] ${sex}
[b]DESCRIPTION:[/b] ${description}
[/divbox]`;
};
