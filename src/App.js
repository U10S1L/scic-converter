import TextareaAutosize from "react-textarea-autosize";
import { useEffect, useState } from "react";
import { generateSangang } from "./formats/sangang";
import { generatePoi } from "./formats/poi";

import "./App.css";
import CopyToClipboard from "react-copy-to-clipboard";
function App() {
  const [oldPersonFile, setOldPersonFile] = useState(``);
  const [parsedOldPersonFile, setParsedOldPersonFile] = useState({
    name: "",
    age: "",
    race: "",
    sex: "",
    description: "",
    phoneNumbers: "",
    residences: "",
    vehicles: "",
    isA: false,
    isB: false,
    isC: false,
    isD: false,
    isE: false,
    isF: false,
    isG: false,
    isH: false,
    evidenceA: "",
    evidenceB: "",
    evidenceC: "",
    evidenceD: "",
    evidenceE: "",
    evidenceF: "",
    evidenceG: "",
    evidenceH: "",
    criteriaEvidence: "",
    log: "",
    mentionedIn: "",
  });

  const boldedFieldLabelRegexp = (fieldName, nextFieldName) => {
    return new RegExp(
      `(?<=\\[b\\]\\s*${fieldName}\\s*:*\\s*\\[\\/b\\]\\s*)` +
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

  useEffect(() => {
    const criteriaCheckedChecker = (criteriaLabel) => {
      if (oldPersonFile != null) {
        const oldCriteriaRegex = oldPersonFile.match(
          new RegExp(`.*[^\\s*](?=\\s${criteriaLabel})`, "gi")
        );
        if (oldCriteriaRegex != null) {
          return (
            oldCriteriaRegex[0].indexOf("cbc") !== -1 ||
            oldCriteriaRegex[0].indexOf("CBC") !== -1 ||
            oldCriteriaRegex[0].indexOf("X") !== -1 ||
            oldCriteriaRegex[0].indexOf("x") !== -1
          );
        }
      }
    };
    if (oldPersonFile != null) {
      const mdcUrl = oldPersonFile.match(
        /(https:\/\/mdc.gta.world).*(?=\]\w*\[\/url\])/gi
      );
      const imgUrl = oldPersonFile.match(
        /(?<=\[divbox=white\]\[img\]).*(?=\[\/img\])/gi
      );

      const name1 = oldPersonFile.match(
        boldedFieldLabelRegexp("FULL NAME", "ALIASES")
      );
      const name2 = oldPersonFile.match(boldedFieldLabelRegexp("NAME", "AGE"));
      const age = oldPersonFile.match(boldedFieldLabelRegexp("AGE", "RACE"));
      const race = oldPersonFile.match(boldedFieldLabelRegexp("RACE", "SEX"));
      const sex1 = oldPersonFile.match(
        boldedFieldLabelRegexp("SEX", "PHYSICAL DESCRIPTION")
      );
      const sex2 = oldPersonFile.match(
        boldedFieldLabelRegexp("SEX", "DESCRIPTION")
      );
      const description1 = oldPersonFile.match(
        boldedFieldLabelRegexp("PHYSICAL DESCRIPTION", "KNOWN ASSOCIATES")
      );
      const description2 = oldPersonFile.match(
        boldedFieldLabelRegexp("DESCRIPTION", "PHONE NUMBER\\(S\\)")
      );
      const moniker1 = oldPersonFile.match(
        boldedFieldLabelRegexp("ALIASES", "TYPE")
      );
      const moniker2 = oldPersonFile.match(
        boldedFieldLabelRegexp("MONIKER", "§ 305 CRITERION")
      );
      const gangClique1 = oldPersonFile.match(
        boldedFieldLabelRegexp("AFFILIATION", "PHONE")
      );
      const gangClique2 = oldPersonFile.match(
        boldedFieldLabelRegexp("GANG/CLIQUE", "MONIKER")
      );
      const phoneNumbers1 = oldPersonFile.match(
        boldedFieldLabelRegexp("PHONE NUMBER", "RESIDENCE")
      );
      const phoneNumbers2 = oldPersonFile.match(
        boldedFieldLabelRegexp("PHONE NUMBER\\(S\\)", "RESIDENCE\\(S\\)")
      );
      const residences = oldPersonFile.match(
        boldedFieldLabelRegexp("RESIDENCE\\(S\\)", "VEHICLE\\(S\\)")
      );
      const vehicles1 = oldPersonFile.match(
        boldedFieldLabelRegexp("VEHICLE\\(S\\)", "AGE")
      );

      const vehicles2 = oldPersonFile.match(
        boldedFieldLabelRegexp(
          "VEHICLE\\(S\\)",
          "\\[color=#FFFFFF\\]SANGANG\\[\\/color\\]"
        )
      );

      const log1 = oldPersonFile.match(
        new RegExp(
          `(?<=\\s*NOTES & SUBMISSIONS\\[\\/color\\]\\[\\/b\\]\\[\\/center\\]\\[\\/divbox\\]\\s*\\[quote\\]\\s*)[^\\s][^]*[^\\s](?=\\s*\\[\\/quote\\])`,
          "gi"
        )
      );
      const log2 = oldPersonFile.match(
        new RegExp(
          `(?<=\\[b\\]LOG\\[\\/b\\]\\s*\\[quote\\])` +
            `[^]*` +
            `(?=\\[\\/quote\\])`,
          "gi"
        )
      );
      const mentionedIn1 = oldPersonFile.match(
        new RegExp(
          `(?<=\\[b\\]\\s*PERSON MENTIONED IN SUBMISSION\\s*\\[\\/b\\]\\s*)` +
            `[^\\s][^]*[^\\s]` +
            `(?=\\s*\\[hr\\])`,
          "gi"
        )
      );
      const mentionedIn2 = oldPersonFile.match(
        new RegExp(
          `(?<=\\[b\\]\\s*MENTIONED IN\\s*\\[\\/b\\]\\s*)` +
            `[^\\s][^]*[^\\s]` +
            `(?=\\s*\\[\\/divbox\\])`,
          "gi"
        )
      );
      const criteriaEvidence1 = oldPersonFile.match(
        new RegExp(
          `(?<=\\[b\\]\\s*Evidence:\\s*\\[\\/b\\]\\s*)` +
            `[^\\s][^]*[^\\s]` +
            `(?=\\s*\\[\\/list\\]\\[\\/altspoiler\\])`,
          "gi"
        )
      );

      const criteriaEvidence2 = oldPersonFile.match(
        new RegExp(
          `(?<=\\[b\\]\\s*§ 305 EVIDENCE\\s*\\[\\/b\\]\\s*)` +
            `[^\\s][^]*[^\\s]` +
            `(?=\\s*\\[\\/divbox\\]\\s*\\[hr])`,
          "gi"
        )
      );

      setParsedOldPersonFile({
        name: name1 ? name1[0] : name2 ? name2[0] : "",
        age: age ? age[0] : "",
        race: race ? race[0] : "",
        sex: sex1 ? sex1[0] : sex2 ? sex2[0] : "",
        description: description1
          ? description1[0]
          : description2
          ? description2[0]
          : "",
        phoneNumbers: phoneNumbers1
          ? cleanBasicListData(phoneNumbers1[0])
          : phoneNumbers2
          ? cleanBasicListData(phoneNumbers2[0])
          : "",
        residences: residences ? cleanBasicListData(residences[0]) : "",
        vehicles: vehicles1
          ? cleanBasicListData(vehicles1[0])
          : vehicles2
          ? cleanBasicListData(
              vehicles2[0].replace(
                new RegExp(
                  `\\[\\/divbox\\]\\s*\\[hr\\]\\[\\/hr\\]\\s*\\[divbox=black\\]\\[center\\]`,
                  "gi"
                ),
                ""
              )
            )
          : "",
        isA: criteriaCheckedChecker("by a court"),
        isB:
          criteriaCheckedChecker("gang affiliated markings") ||
          criteriaCheckedChecker("having gang tattoos"),
        isC: criteriaCheckedChecker("has admitted to being a"),
        isD: criteriaCheckedChecker("arrested with known gang members"),
        isE: criteriaCheckedChecker("reliable confidential"),
        isF: criteriaCheckedChecker("associating with recorded"),
        isG: criteriaCheckedChecker("displaying gang symbols"),
        isH: criteriaCheckedChecker("frequenting gang areas"),
        evidenceA: "",
        evidenceB: "",
        evidenceC: "",
        evidenceD: "",
        evidenceE: "",
        evidenceF: "",
        evidenceG: "",
        evidenceH: "",
        criteriaEvidence: criteriaEvidence1
          ? criteriaEvidence1[0]
          : criteriaEvidence2
          ? criteriaEvidence2[0]
          : "",
        gangClique: gangClique1
          ? gangClique1[0]
          : gangClique2
          ? gangClique2[0]
          : "",
        moniker: moniker1
          ? moniker1[0]
          : moniker2
          ? moniker2[0].replace(
              new RegExp(`\\s*\\[altspoiler=§ 305\\]\\s*`, "gi"),
              ""
            )
          : "",
        log: log1
          ? cleanBasicListData(log1[0])
          : log2
          ? cleanBasicListData(log2[0])
          : "",
        mentionedIn: mentionedIn1
          ? cleanBasicListData(mentionedIn1[0])
          : mentionedIn2
          ? cleanBasicListData(mentionedIn2[0])
          : "",
        mdcUrl: mdcUrl ? mdcUrl[0] : "",
        imgUrl: imgUrl ? imgUrl[0] : "",
      });
    }
  }, [oldPersonFile]);

  useEffect(() => {}, [parsedOldPersonFile]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="form-group col-2">
          <label
            style={{
              backgroundColor: "black",
              color: "white",
              fontWeight: "bold",
            }}
          >
            1: PARSE
          </label>
          <TextareaAutosize
            className="form-control form-control-sm"
            placeholder="Paste SANPERS/SANGANG"
            maxRows={1}
            value={oldPersonFile}
            onChange={(e) => setOldPersonFile(e.target.value)}
          />
        </div>
        <div className="col-10">
          <div className="row">
            <div className="form-group col-2">
              <label>NAME</label>
              <TextareaAutosize
                className="form-control form-control-sm"
                value={parsedOldPersonFile.name}
                onChange={(e) =>
                  setParsedOldPersonFile({
                    ...parsedOldPersonFile,
                    name: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group col-1">
              <label>AGE</label>
              <TextareaAutosize
                className="form-control form-control-sm"
                value={parsedOldPersonFile.age}
                onChange={(e) =>
                  setParsedOldPersonFile({
                    ...parsedOldPersonFile,
                    age: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group col-1">
              <label>RACE</label>
              <TextareaAutosize
                className="form-control form-control-sm"
                value={parsedOldPersonFile.race}
                onChange={(e) =>
                  setParsedOldPersonFile({
                    ...parsedOldPersonFile,
                    race: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group col-1">
              <label>SEX</label>
              <TextareaAutosize
                className="form-control form-control-sm"
                value={parsedOldPersonFile.sex}
                onChange={(e) =>
                  setParsedOldPersonFile({
                    ...parsedOldPersonFile,
                    sex: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group col">
              <label>DESCRIPTION</label>
              <TextareaAutosize
                maxRows={1}
                minRows={1}
                className="form-control form-control-sm"
                value={parsedOldPersonFile.description}
                onChange={(e) =>
                  setParsedOldPersonFile({
                    ...parsedOldPersonFile,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="form-group col-3">
          <label>MDC URL</label>
          <TextareaAutosize
            className="form-control form-control-sm"
            maxRows={1}
            value={parsedOldPersonFile.mdcUrl}
            onChange={(e) =>
              setParsedOldPersonFile({
                ...parsedOldPersonFile,
                mdcUrl: e.target.value,
              })
            }
          />
        </div>
        <div className="form-group col-3">
          <label>IMG URL</label>
          <TextareaAutosize
            className="form-control form-control-sm"
            value={parsedOldPersonFile.imgUrl}
            maxRows={1}
            onChange={(e) =>
              setParsedOldPersonFile({
                ...parsedOldPersonFile,
                imgUrl: e.target.value,
              })
            }
          />
        </div>
        <div className="form-group col-2">
          <label>GANG/CLIQUE</label>
          <TextareaAutosize
            className="form-control form-control-sm"
            value={parsedOldPersonFile.gangClique}
            onChange={(e) =>
              setParsedOldPersonFile({
                ...parsedOldPersonFile,
                gangClique: e.target.value,
              })
            }
          />
        </div>
        <div className="form-group col-2">
          <label>MONIKER</label>
          <TextareaAutosize
            className="form-control form-control-sm"
            value={parsedOldPersonFile.moniker}
            onChange={(e) =>
              setParsedOldPersonFile({
                ...parsedOldPersonFile,
                moniker: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="row">
        <div className="form-group col-1">
          <label>PHONES</label>
          <TextareaAutosize
            minRows={4}
            maxRows={4}
            className="form-control form-control-sm"
            value={parsedOldPersonFile.phoneNumbers}
            onChange={(e) =>
              setParsedOldPersonFile({
                ...parsedOldPersonFile,
                phoneNumbers: e.target.value,
              })
            }
          />
        </div>
        <div className="form-group col-2">
          <label>RESIDENCE(S)</label>{" "}
          <TextareaAutosize
            minRows={4}
            maxRows={4}
            className="form-control form-control-sm"
            value={parsedOldPersonFile.residences}
            onChange={(e) =>
              setParsedOldPersonFile({
                ...parsedOldPersonFile,
                residences: e.target.value,
              })
            }
          />
        </div>
        <div className="form-group col-2">
          <label> VEHICLE(S)</label>
          <TextareaAutosize
            className="form-control form-control-sm"
            minRows={4}
            maxRows={4}
            value={parsedOldPersonFile.vehicles}
            onChange={(e) =>
              setParsedOldPersonFile({
                ...parsedOldPersonFile,
                vehicles: e.target.value,
              })
            }
          />
        </div>
        <div className="form-group col-3">
          <label>LOG</label>
          <TextareaAutosize
            className="form-control form-control-sm"
            minRows={4}
            maxRows={4}
            value={parsedOldPersonFile.log}
            onChange={(e) =>
              setParsedOldPersonFile({
                ...parsedOldPersonFile,
                log: e.target.value,
              })
            }
          />
        </div>
        <div className="form-group col-4">
          <label> MENTIONED IN: </label>
          <TextareaAutosize
            className="form-control form-control-sm"
            minRows={4}
            maxRows={4}
            value={parsedOldPersonFile.mentionedIn}
            onChange={(e) =>
              setParsedOldPersonFile({
                ...parsedOldPersonFile,
                mentionedIn: e.target.value,
              })
            }
          />
        </div>
      </div>
      <hr></hr>
      <label
        style={{
          backgroundColor: "black",
          color: "white",
          fontWeight: "bold",
        }}
      >
        2: FIX 305
      </label>
      <div className="row">
        <div className="form-group col">
          <label>OLD § 305 EVIDENCE</label>
          <TextareaAutosize
            minRows={4}
            className="form-control form-control-sm"
            value={parsedOldPersonFile.criteriaEvidence}
            onChange={(e) =>
              setParsedOldPersonFile({
                ...parsedOldPersonFile,
                criteriaEvidence: e.target.value,
              })
            }
          />
        </div>
        <div className="col">
          <label>NEW § 305</label>
          <Criterion
            label="A: Person has been ruled to be a gang member by a court"
            isChecked={parsedOldPersonFile.isA}
            evidenceText={parsedOldPersonFile.evidenceA}
            onChangeCheckedHandler={(isA) =>
              setParsedOldPersonFile({
                ...parsedOldPersonFile,
                isA,
              })
            }
            onChangeEvidenceHandler={(evidenceA) =>
              setParsedOldPersonFile({ ...parsedOldPersonFile, evidenceA })
            }
          />
          <Criterion
            label="B: Person is marked in any permanent way with gang affiliated markings (e.g. tattoos, branding, scaring)"
            isChecked={parsedOldPersonFile.isB}
            evidenceText={parsedOldPersonFile.evidenceB}
            onChangeCheckedHandler={(isB) =>
              setParsedOldPersonFile({
                ...parsedOldPersonFile,
                isB,
              })
            }
            onChangeEvidenceHandler={(evidenceB) =>
              setParsedOldPersonFile({ ...parsedOldPersonFile, evidenceB })
            }
          />
          <Criterion
            label="C: Person has admitted to being a gang member (self-proclamation)"
            isChecked={parsedOldPersonFile.isC}
            evidenceText={parsedOldPersonFile.evidenceC}
            onChangeCheckedHandler={(isC) =>
              setParsedOldPersonFile({
                ...parsedOldPersonFile,
                isC,
              })
            }
            onChangeEvidenceHandler={(evidenceC) =>
              setParsedOldPersonFile({ ...parsedOldPersonFile, evidenceC })
            }
          />
          <Criterion
            label="D: Person has been arrested with known gang members for offenses consistent with gang activity"
            isChecked={parsedOldPersonFile.isD}
            evidenceText={parsedOldPersonFile.evidenceD}
            onChangeCheckedHandler={(isD) =>
              setParsedOldPersonFile({
                ...parsedOldPersonFile,
                isD,
              })
            }
            onChangeEvidenceHandler={(evidenceD) =>
              setParsedOldPersonFile({ ...parsedOldPersonFile, evidenceD })
            }
          />
          <Criterion
            label="E: Person has been identified as a gang member by a reliable confidential informant/source registered by the law enforcement agency"
            isChecked={parsedOldPersonFile.isE}
            evidenceText={parsedOldPersonFile.evidenceE}
            onChangeCheckedHandler={(isE) =>
              setParsedOldPersonFile({
                ...parsedOldPersonFile,
                isE,
              })
            }
            onChangeEvidenceHandler={(evidenceE) =>
              setParsedOldPersonFile({ ...parsedOldPersonFile, evidenceE })
            }
          />
          <Criterion
            label="F: Person has been documented associating with recorded gang members"
            isChecked={parsedOldPersonFile.isF}
            evidenceText={parsedOldPersonFile.evidenceF}
            onChangeCheckedHandler={(isF) =>
              setParsedOldPersonFile({
                ...parsedOldPersonFile,
                isF,
              })
            }
            onChangeEvidenceHandler={(evidenceF) =>
              setParsedOldPersonFile({ ...parsedOldPersonFile, evidenceF })
            }
          />
          <Criterion
            label="G: Person has been documented displaying gang symbols and/or hand signs"
            isChecked={parsedOldPersonFile.isG}
            evidenceText={parsedOldPersonFile.evidenceG}
            onChangeCheckedHandler={(isG) =>
              setParsedOldPersonFile({
                ...parsedOldPersonFile,
                isG,
              })
            }
            onChangeEvidenceHandler={(evidenceG) =>
              setParsedOldPersonFile({ ...parsedOldPersonFile, evidenceG })
            }
          />
          <Criterion
            label="H: Person has been documented by law enforcement frequenting gang areas"
            isChecked={parsedOldPersonFile.isH}
            evidenceText={parsedOldPersonFile.evidenceH}
            onChangeCheckedHandler={(isH) =>
              setParsedOldPersonFile({
                ...parsedOldPersonFile,
                isH,
              })
            }
            onChangeEvidenceHandler={(evidenceH) =>
              setParsedOldPersonFile({ ...parsedOldPersonFile, evidenceH })
            }
          />
        </div>
      </div>
      <hr></hr>
      <div
        className="row"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <CopyToClipboard
          text={generateSangang(
            parsedOldPersonFile.name,
            parsedOldPersonFile.gangClique,
            parsedOldPersonFile.moniker,
            parsedOldPersonFile.mdcUrl,
            parsedOldPersonFile.isA,
            parsedOldPersonFile.isB,
            parsedOldPersonFile.isC,
            parsedOldPersonFile.isD,
            parsedOldPersonFile.isE,
            parsedOldPersonFile.isF,
            parsedOldPersonFile.isG,
            parsedOldPersonFile.isH,
            parsedOldPersonFile.evidenceA,
            parsedOldPersonFile.evidenceB,
            parsedOldPersonFile.evidenceC,
            parsedOldPersonFile.evidenceD,
            parsedOldPersonFile.evidenceE,
            parsedOldPersonFile.evidenceF,
            parsedOldPersonFile.evidenceG,
            parsedOldPersonFile.evidenceH
          )}
        >
          <button className="btn btn-secondary" style={{ fontWeight: "bold" }}>
            📋 SanGang
          </button>
        </CopyToClipboard>
        <CopyToClipboard
          text={generatePoi(
            parsedOldPersonFile.imgUrl,
            parsedOldPersonFile.mdcUrl,
            parsedOldPersonFile.name,
            parsedOldPersonFile.race,
            parsedOldPersonFile.sex,
            parsedOldPersonFile.description
          )}
        >
          <button className="btn btn-primary" style={{ fontWeight: "bold" }}>
            📋 POI
          </button>
        </CopyToClipboard>
      </div>
    </div>
  );
}

const Criterion = ({
  label,
  isChecked,
  evidenceText,
  onChangeCheckedHandler,
  onChangeEvidenceHandler,
}) => {
  return (
    <div>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          checked={isChecked}
          onChange={(e) => onChangeCheckedHandler(e.target.checked)}
        />
        <label className="form-check-label">{label}</label>
      </div>
      <TextareaAutosize
        style={
          isChecked && evidenceText === "" ? { border: "1px solid red" } : {}
        }
        className="form-control form-control-sm"
        value={evidenceText}
        onChange={(e) => onChangeEvidenceHandler(e.target.value)}
      />
    </div>
  );
};

export default App;
