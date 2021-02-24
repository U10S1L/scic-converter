import TextareaAutosize from "react-textarea-autosize";
import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [oldBBCode, setOldBBCode] = useState(``);
  const [newPersonFile, setNewPersonFile] = useState(``);
  const [newStuff, setNewStuff] = useState({
    mdcLink: "",
    imgUrl: "",
    name: "",
    age: "",
    race: "",
    sex: "",
    description: "",

    phoneNumbers: "",
    residences: "",
    vehicles: "",

    isGangMember: false,
    gangClique: "",
    moniker: "",

    criteriaCourt: false,
    criteriaTats: false,
    criteriaSelfProc: false,
    criteriaArrested: false,
    criteriaCIRegSource: false,
    criteriaAssociating: false,
    criteriaSymbSign: false,
    criteriaFrequenting: false,
    criteriaEvidence: "",

    log: ``,
    mentionedIn: "",
  });

  const boldedFieldLabelRegexp = (fieldName, nextFieldName) => {
    return new RegExp(
      `(?<=\\[b\\]\\s*${fieldName}\\s*:\\s*\\[\\/b\\]\\s*)` +
        `[^\\s][^]*[^\\s]` +
        `(?=\\s*\\[b\\]${nextFieldName})`,
      "gi"
    );
  };

  const cleanBasicListData = (listData) => {
    return listData
      .replace(new RegExp(`\\s*\\[list\\]\\s*`, "gi"), "")
      .replace(new RegExp(`\\s*\\[\\/list\\]\\s*`, "gi"), "")
      .replace(new RegExp(`\\[\\*\\]\\s*`, "gi"), "");
  };

  const cleanLogListData = (logListData) => {
    return cleanBasicListData(logListData).replace(
      new RegExp(`DD/MMM/YYYY - Notes`, "gi"),
      `[*] -
DD/MMM/YYYY [b]— Author[/b]`
    );
  };

  const cleanMentionedInListData = (mentionedInListData) => {
    return cleanBasicListData(mentionedInListData).replace(
      new RegExp(
        `\\[url=LINK TO SUBMISSION\\]SUBMISSION NAME\\[\\/url\\]`,
        "gi"
      ),
      `[*] [url=LINK]Title[/url]`
    );
  };

  const magicButton = (newStuffFieldName) => {
    setNewStuff({
      ...newStuff,
      [newStuffFieldName]: newStuff[newStuffFieldName]
        .replace(new RegExp(`\\[\\*\\]\\s*`, "g"), "")
        .replace(new RegExp(`^`, "gm"), "[*] "),
    });
  };

  const criteriaCheckedChecker = (criteriaLabel) => {
    if (oldBBCode != null) {
      const oldCriteriaRegex = oldBBCode.match(
        new RegExp(`.*[^\\s*](?=\\s${criteriaLabel})`, "gi")
      );
      if (oldCriteriaRegex != null) {
        return (
          oldCriteriaRegex[0].indexOf("cbc") != -1 ||
          oldCriteriaRegex[0].indexOf("CBC") != -1 ||
          oldCriteriaRegex[0].indexOf("X") != -1 ||
          oldCriteriaRegex[0].indexOf("x") != -1
        );
      }
    }
  };

  const parseOld = () => {
    if (oldBBCode != null) {
      const mdcLink = oldBBCode.match(
        /(https:\/\/mdc.gta.world).*(?=\]\w*\[\/url\])/gi
      );
      const imgUrl = oldBBCode.match(
        /(?<=\[divbox=white\]\[img\]).*(?=\[\/img\])/gi
      );

      const name = oldBBCode.match(
        boldedFieldLabelRegexp("FULL NAME", "ALIASES")
      );
      const moniker = oldBBCode.match(
        boldedFieldLabelRegexp("ALIASES", "TYPE")
      );
      const gangClique = oldBBCode.match(
        boldedFieldLabelRegexp("AFFILIATION", "PHONE")
      );
      const phones = oldBBCode.match(
        boldedFieldLabelRegexp("PHONE NUMBER", "RESIDENCE")
      );
      const residences = oldBBCode.match(
        boldedFieldLabelRegexp("RESIDENCE\\(S\\)", "VEHICLE\\(S\\)")
      );
      const vehicles = oldBBCode.match(
        boldedFieldLabelRegexp("VEHICLE\\(S\\)", "AGE")
      );
      const age = oldBBCode.match(boldedFieldLabelRegexp("AGE", "RACE"));

      const race = oldBBCode.match(boldedFieldLabelRegexp("RACE", "SEX"));
      const sex = oldBBCode.match(
        boldedFieldLabelRegexp("SEX", "PHYSICAL DESCRIPTION")
      );
      const description = oldBBCode.match(
        boldedFieldLabelRegexp("PHYSICAL DESCRIPTION", "KNOWN ASSOCIATES")
      );

      const log = oldBBCode.match(
        new RegExp(
          `(?<=\\s*NOTES & SUBMISSIONS\\[\\/color\\]\\[\\/b\\]\\[\\/center\\]\\[\\/divbox\\]\\s*\\[quote\\]\\s*)[^\\s][^]*[^\\s](?=\\s*\\[\\/quote\\])`,
          "gi"
        )
      );
      const mentionedIn = oldBBCode.match(
        new RegExp(
          `(?<=\\[b\\]\\s*PERSON MENTIONED IN SUBMISSION\\s*\\[\\/b\\]\\s*)` +
            `[^\\s][^]*[^\\s]` +
            `(?=\\s*\\[hr\\])`,
          "gi"
        )
      );

      const criteriaEvidence = oldBBCode.match(
        new RegExp(
          `(?<=\\[b\\]\\s*Evidence:\\s*\\[\\/b\\]\\s*)` +
            `[^\\s][^]*[^\\s]` +
            `(?=\\s*\\[\\/list\\]\\[\\/altspoiler\\])`,
          "gi"
        )
      );

      setNewStuff({
        mdcLink: mdcLink ? mdcLink[0] : "",
        imgUrl: imgUrl ? imgUrl[0] : "https://i.imgur.com/RvO2yL5.png?1",
        name: name ? name[0] : "",
        age: age ? age[0] : "",
        race: race ? race[0] : "",
        sex: sex ? sex[0] : "",
        description: description ? description[0] : "",
        phoneNumbers: phones ? phones[0] : "[*]",
        residences: residences ? cleanBasicListData(residences[0]) : "[*]",
        vehicles: vehicles
          ? cleanBasicListData(vehicles[0])
          : "[*] MODEL (PLATE) [VIN]",
        moniker: moniker ? moniker[0] : "",
        gangClique: gangClique ? gangClique[0] : "",
        log: log
          ? cleanLogListData(log[0])
          : `[*] -
DD/MMM/YYYY [b]— Author[/b]`,
        mentionedIn: mentionedIn
          ? cleanMentionedInListData(mentionedIn[0])
          : "[*] [url=LINK]Document Title[/url]",

        criteriaCourt: false,
        criteriaTats: criteriaCheckedChecker(
          "Subject has been documented having gang tattoos"
        ),
        criteriaSelfProc: criteriaCheckedChecker(
          "Subject has admitted to being a gang member"
        ),
        criteriaArrested: criteriaCheckedChecker(
          "Subject has been arrested with known gang members"
        ),
        criteriaCIRegSource: criteriaCheckedChecker(
          "Subject has been identified as a gang member by a reliable confidential"
        ),
        criteriaAssociating: criteriaCheckedChecker(
          "Subject has been documented associating"
        ),
        criteriaSymbSign: criteriaCheckedChecker(
          "Subject has been documented displaying gang symbols"
        ),
        criteriaFrequenting: criteriaCheckedChecker(
          "Subject has been documented by law enforcement frequenting"
        ),
        criteriaEvidence: criteriaEvidence
          ? criteriaEvidence[0]
          : `[altspoiler=§ 305 CRITERIA]
Evidence for this [cbc]'ed § 305 CRITERIA (links to reports/documentation, photographs, narratives, etc.)
[/altspoiler]`,
      });
    }
  };

  useEffect(() => {
    const atLeast2 =
      [
        newStuff.criteriaArrested,
        newStuff.criteriaAssociating,
        newStuff.criteriaCIRegSource,
        newStuff.criteriaFrequenting,
        newStuff.criteriaSelfProc,
        newStuff.criteriaSymbSign,
      ].filter((criteriaBool) => criteriaBool == true).length >= 2;
    setNewStuff({
      ...newStuff,
      isGangMember: newStuff.criteriaCourt || newStuff.criteriaTats || atLeast2,
    });
  }, [
    newStuff.criteriaArrested,
    newStuff.criteriaAssociating,
    newStuff.criteriaCIRegSource,
    newStuff.criteriaCourt,
    newStuff.criteriaFrequenting,
    newStuff.criteriaSelfProc,
    newStuff.criteriaSymbSign,
    newStuff.criteriaTats,
  ]);

  useEffect(() => {
    setNewPersonFile(`[divbox=white]
[center][b][u]STATE CRIME INFORMATION CENTER - PERSON FILE[/u][/b][/center]
[divbox=black][center][b][color=#FFFFFF]SANPERS[/color][/b][/center][/divbox]
[divbox=white]
[aligntable=right,180,1,0,0,0,0]
[CENTER][divbox=white][img]${newStuff.imgUrl}[/img][/divbox][/CENTER]
[center][b]MDC:[/b] [url=${newStuff.mdcLink}]ACCESS[/URL][/center]
[/aligntable]
[b]NAME:[/b] ${newStuff.name}
[b]AGE:[/b] ${newStuff.age}
[b]RACE:[/b] ${newStuff.race}
[b]SEX:[/b] ${newStuff.sex}
[b]DESCRIPTION:[/b] ${newStuff.description}

[b]PHONE NUMBER(S):[/b]
[list]
${newStuff.phoneNumbers}
[/list]
[b]RESIDENCE(S):[/b]
[list]
${newStuff.residences}
[/list]
[b]VEHICLE(S):[/b]
[list]
${newStuff.vehicles}
[/list]
[/divbox]
[hr][/hr]
[divbox=black][center][b][color=#FFFFFF]SANGANG[/color][/b][/center][/divbox]
[divbox=white]
[aligntable=right,0,1,0,0,0,0]
${newStuff.isGangMember ? "[cbc]" : "[cb]"} § 305 GANG MEMBER
[/aligntable]
[b]GANG/CLIQUE:[/b] ${newStuff.gangClique}
[b]MONIKER:[/b] ${newStuff.moniker}


[altspoiler=§ 305]
[b]§ 305 CRITERION[/b]
${
  newStuff.criteriaCourt ? "[cbc]" : "[cb]"
} Person has been ruled to be a gang member by a court
${
  newStuff.criteriaTats ? "[cbc]" : "[cb]"
} Person is marked in any permanent way with gang affiliated markings (e.g. tattoos, branding, scaring)
${
  newStuff.criteriaSelfProc ? "[cbc]" : "[cb]"
} Person has admitted to being a gang member (self-proclamation)
${
  newStuff.criteriaArrested ? "[cbc]" : "[cb]"
} Person has been arrested with known gang members for offenses consistent with gang activity
${
  newStuff.criteriaCIRegSource ? "[cbc]" : "[cb]"
} Person has been identified as a gang member by a reliable confidential informant/source registered by the law enforcement agency
${
  newStuff.criteriaAssociating ? "[cbc]" : "[cb]"
} Person has been documented associating with recorded gang members
${
  newStuff.criteriaSymbSign ? "[cbc]" : "[cb]"
} Person has been documented displaying gang symbols and/or hand signs
${
  newStuff.criteriaFrequenting ? "[cbc]" : "[cb]"
} Person has been documented by law enforcement frequenting gang areas

[b]§ 305 EVIDENCE[/b] 
${newStuff.criteriaEvidence}
[/altspoiler]
[/divbox]
[hr][/hr]
[divbox=black][center][b][color=#FFFFFF]NOTES & MENTIONS[/color][/b][/center][/divbox]
[divbox=white]
[b]LOG[/b]
[quote] 
[list]
${newStuff.log}
[/list]
[/quote]

[b]MENTIONED IN[/b]
[list]
${newStuff.mentionedIn}
[/list]
[/divbox]
[/divbox]`);
  }, [newStuff]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <label>OLD PERSON FILE (Input)</label>
            <TextareaAutosize
              className="form-control form-control-sm"
              minRows={9}
              maxRows={9}
              value={oldBBCode}
              onChange={(e) => setOldBBCode(e.target.value)}
            />
          </div>
        </div>
        <div className="col-6" style={{ backgroundColor: "lightgray" }}>
          <div className="form-group">
            <label>NEW PERSON FILE (Output)</label>
            <TextareaAutosize
              className="form-control form-control-sm"
              minRows={9}
              maxRows={9}
              value={newPersonFile}
              onChange={(e) => setNewPersonFile(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <button
            type="button"
            className="btn btn-primary"
            style={{ margin: "auto" }}
            onClick={() => parseOld()}
          >
            Parse
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="row">
            <div className="form-group col-6">
              <label>NAME</label>
              <TextareaAutosize
                className="form-control form-control-sm"
                value={newStuff.name}
                onChange={(e) =>
                  setNewStuff({ ...newStuff, name: e.target.value })
                }
              />
            </div>
            <div className="form-group col">
              <label>AGE</label>
              <TextareaAutosize
                className="form-control form-control-sm"
                value={newStuff.age}
                onChange={(e) =>
                  setNewStuff({ ...newStuff, age: e.target.value })
                }
              />
            </div>
            <div className="form-group col">
              <label>RACE</label>
              <TextareaAutosize
                className="form-control form-control-sm"
                value={newStuff.race}
                onChange={(e) =>
                  setNewStuff({ ...newStuff, race: e.target.value })
                }
              />
            </div>
            <div className="form-group col">
              <label>SEX</label>
              <TextareaAutosize
                className="form-control form-control-sm"
                value={newStuff.sex}
                onChange={(e) =>
                  setNewStuff({ ...newStuff, sex: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label>DESCRIPTION</label>
            <TextareaAutosize
              className="form-control form-control-sm"
              value={newStuff.description}
              onChange={(e) =>
                setNewStuff({ ...newStuff, description: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <label>PHONE NUMBER(S)</label>
              <button
                className="btn btn-sm btn-secondary"
                onClick={() =>
                  setNewStuff({
                    ...newStuff,
                    phoneNumbers: newStuff.phoneNumbers.replace(/^/gm, "[*] "),
                  })
                }
              >
                Magic [*]
              </button>
            </div>
            <div className="text-muted small">
              One Phone # per line, then Magic [*]
            </div>
            <TextareaAutosize
              className="form-control form-control-sm"
              value={newStuff.phoneNumbers}
              onChange={(e) =>
                setNewStuff({ ...newStuff, phoneNumbers: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <label>RESIDENCE(S):</label>{" "}
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => magicButton("residences")}
              >
                Magic [*]
              </button>
            </div>
            <div className="text-muted small">
              One Residence per line, then Magic [*]
            </div>
            <TextareaAutosize
              className="form-control form-control-sm"
              value={newStuff.residences}
              onChange={(e) =>
                setNewStuff({ ...newStuff, residences: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <label> VEHICLE(S):</label>
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => magicButton("vehicles")}
              >
                Magic [*]
              </button>
            </div>
            <div className="text-muted small">
              One [*] Vehicle per line, then Magic [*]
            </div>
            <TextareaAutosize
              className="form-control form-control-sm"
              value={newStuff.vehicles}
              onChange={(e) =>
                setNewStuff({ ...newStuff, vehicles: e.target.value })
              }
            />
          </div>
        </div>
        <div className="col-6">
          <div className="row">
            <div className="form-group col">
              <label>GANG/CLIQUE:</label>
              <TextareaAutosize
                className="form-control form-control-sm"
                value={newStuff.gangClique}
                onChange={(e) =>
                  setNewStuff({ ...newStuff, gangClique: e.target.value })
                }
              />
            </div>
            <div className="form-group col">
              <label>MONIKER:</label>
              <TextareaAutosize
                className="form-control form-control-sm"
                value={newStuff.moniker}
                onChange={(e) =>
                  setNewStuff({ ...newStuff, moniker: e.target.value })
                }
              />
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={newStuff.isGangMember}
                onChange={(e) =>
                  setNewStuff({ ...newStuff, isGangMember: e.target.checked })
                }
              />
              <label className="form-check-label">§ 305 CONFIRMED</label>
            </div>
          </div>
          <div>
            <label>§ 305 CRITEREON:</label>
            <Critereon
              label="Person has been ruled to be a gang member by a court"
              isChecked={newStuff.criteriaCourt}
              onChangeCheckedHandler={(isChecked) =>
                setNewStuff({ ...newStuff, criteriaCourt: isChecked })
              }
            />
            <Critereon
              label="Person is marked in any permanent way with gang affiliated markings (e.g. tattoos, branding, scaring)"
              isChecked={newStuff.criteriaTats}
              onChangeCheckedHandler={(isChecked) =>
                setNewStuff({ ...newStuff, criteriaTats: isChecked })
              }
            />
            <Critereon
              label="Person has admitted to being a gang member (self-proclamation)"
              isChecked={newStuff.criteriaSelfProc}
              onChangeCheckedHandler={(isChecked) =>
                setNewStuff({ ...newStuff, criteriaSelfProc: isChecked })
              }
            />
            <Critereon
              label="Person has been arrested with known gang members for offenses consistent with gang activity"
              isChecked={newStuff.criteriaArrested}
              onChangeCheckedHandler={(isChecked) =>
                setNewStuff({ ...newStuff, criteriaArrested: isChecked })
              }
            />
            <Critereon
              label="Person has been identified as a gang member by a reliable confidential informant/source registered by the law enforcement agency"
              isChecked={newStuff.criteriaCIRegSource}
              onChangeCheckedHandler={(isChecked) =>
                setNewStuff({ ...newStuff, criteriaCIRegSource: isChecked })
              }
            />
            <Critereon
              label="Person has been documented associating with recorded gang members"
              isChecked={newStuff.criteriaAssociating}
              onChangeCheckedHandler={(isChecked) =>
                setNewStuff({ ...newStuff, criteriaAssociating: isChecked })
              }
            />
            <Critereon
              label="Person has been documented displaying gang symbols and/or hand signs"
              isChecked={newStuff.criteriaSymbSign}
              onChangeCheckedHandler={(isChecked) =>
                setNewStuff({ ...newStuff, criteriaSymbSign: isChecked })
              }
            />
            <Critereon
              label="Person has been documented by law enforcement frequenting gang areas"
              isChecked={newStuff.criteriaFrequenting}
              onChangeCheckedHandler={(isChecked) =>
                setNewStuff({ ...newStuff, criteriaFrequenting: isChecked })
              }
            />
          </div>
          <div className="form-group">
            <label>§ 305 EVIDENCE:</label>
            <TextareaAutosize
              className="form-control form-control-sm"
              value={newStuff.criteriaEvidence}
              onChange={(e) =>
                setNewStuff({ ...newStuff, criteriaEvidence: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <label>LOG:</label>
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => magicButton("log")}
              >
                Magic [*]
              </button>
            </div>
            <TextareaAutosize
              className="form-control form-control-sm"
              value={newStuff.log}
              onChange={(e) =>
                setNewStuff({ ...newStuff, log: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <label> MENTIONED IN: </label>
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => magicButton("mentionedIn")}
              >
                Magic [*]
              </button>
            </div>
            <TextareaAutosize
              className="form-control form-control-sm"
              value={newStuff.mentionedIn}
              onChange={(e) =>
                setNewStuff({ ...newStuff, mentionedIn: e.target.value })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const Critereon = ({ label, isChecked, onChangeCheckedHandler }) => {
  return (
    <div className="form-check">
      <input
        type="checkbox"
        className="form-check-input"
        checked={isChecked}
        onChange={(e) => onChangeCheckedHandler(e.target.checked)}
      />
      <label className="form-check-label">{label}</label>
    </div>
  );
};

export default App;
