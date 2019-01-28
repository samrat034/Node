const fs = require("fs");
const d = fs.readFileSync("./resultset.json");

const input = JSON.parse(d);

const output = [];

/* Helper function  */
const lowerCaseIfNotEmpty = v =>
  typeof v === "string" && v !== null && v !== undefined ? v.toLowerCase() : v;

debugger;

input.forEach(element => {
  const deptcode = lowerCaseIfNotEmpty(element.DEPT_CODE);

  let deptIndex = output.findIndex(o => o.dept_code === deptcode);

  let deptObj = {};

  if (deptIndex >= 0) {
    deptObj = output[deptIndex];
  } else {
    output.push(deptObj);
  }

  deptObj.dept_code = deptcode;
  deptObj.dept_desc = lowerCaseIfNotEmpty(element.DEPT_DESC);

  deptObj.checklists = deptObj.checklists || [];

  let checklistIndex = deptObj.checklists.findIndex(
    checklist => checklist.checklist_id === lowerCaseIfNotEmpty(element.CHECKLIST_ID)
  );

  let checklistObj = {};

  if (checklistIndex >= 0) {
    checklistObj = deptObj.checklists[checklistIndex];
  } else {
    deptObj.checklists.push(checklistObj);
  }

  checklistObj.checklist_id = lowerCaseIfNotEmpty(element.CHECKLIST_ID);
  checklistObj.checklist_name = lowerCaseIfNotEmpty(element.CHECKLIST_NAME);
  checklistObj.entry_id = lowerCaseIfNotEmpty(element.ENTRY_ID);
  checklistObj.entered_date = lowerCaseIfNotEmpty(element.ENTERED_DATE);
  checklistObj.entered_by = lowerCaseIfNotEmpty(element.ENTERED_BY);
  checklistObj.complete_flag = lowerCaseIfNotEmpty(element.COMPLETE_FLAG);
  checklistObj.complete_by = lowerCaseIfNotEmpty(element.COMPLETED_BY);
  checklistObj.complete_date = lowerCaseIfNotEmpty(element.COMPLETE_DATE);
  checklistObj.last_update_date = lowerCaseIfNotEmpty(element.LAST_UPDATE_DATE);
  checklistObj.last_update_by = lowerCaseIfNotEmpty(element.LAST_UPDATE_BY);

  checklistObj.questions = checklistObj.questions || [];

  checklistObj.questions.push({
    question_id: lowerCaseIfNotEmpty(element.QUESTION_ID),
    question: lowerCaseIfNotEmpty(element.QUESTION),
    response: lowerCaseIfNotEmpty(element.RESPONSE),
    comments: lowerCaseIfNotEmpty(element.COMMENTS)
  });
});
console.log(JSON.stringify(output));
