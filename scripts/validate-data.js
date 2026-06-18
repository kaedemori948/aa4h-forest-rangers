const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const failures = [];

function fail(message) {
  failures.push(message);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
  } catch (error) {
    fail(`${file} is not valid JSON: ${error.message}`);
    return null;
  }
}

function readAgentsJs() {
  const context = { window: {} };
  try {
    const source = fs.readFileSync(path.join(root, "agents.js"), "utf8");
    vm.runInNewContext(source, context, { filename: "agents.js" });
  } catch (error) {
    fail(`agents.js cannot be evaluated: ${error.message}`);
    return null;
  }
  return context.window.AGENTS_DATA || null;
}

function validateDataset(label, data) {
  if (!data) return;

  assert(data.meta && typeof data.meta === "object", `${label}: meta is required`);
  assert(Array.isArray(data.categories), `${label}: categories must be an array`);
  assert(Array.isArray(data.agents), `${label}: agents must be an array`);
  if (!Array.isArray(data.categories) || !Array.isArray(data.agents)) return;

  const categoryIds = new Set(data.categories.map(category => category.id));
  const ids = new Set();
  const counts = new Map();

  for (const category of data.categories) {
    assert(typeof category.id === "string" && category.id, `${label}: category id is required`);
    assert(typeof category.name === "string" && category.name, `${label}: category ${category.id} name is required`);
    assert(Number.isInteger(category.count) && category.count >= 0, `${label}: category ${category.id} count must be a non-negative integer`);
    counts.set(category.id, 0);
  }

  for (const agent of data.agents) {
    assert(Number.isInteger(agent.id), `${label}: agent id must be an integer`);
    assert(!ids.has(agent.id), `${label}: duplicate agent id ${agent.id}`);
    ids.add(agent.id);

    assert(typeof agent.title === "string" && agent.title.trim(), `${label}: agent ${agent.id} title is required`);
    assert(categoryIds.has(agent.category), `${label}: agent ${agent.id} has unknown category ${agent.category}`);
    counts.set(agent.category, (counts.get(agent.category) || 0) + 1);

    assert(Number.isFinite(agent.views) && agent.views >= 0, `${label}: agent ${agent.id} views must be non-negative`);
    assert(!agent.published || /^\d{4}-\d{2}-\d{2}$/.test(agent.published), `${label}: agent ${agent.id} published must be YYYY-MM-DD`);
    assert(agent.rating == null || (Number.isFinite(agent.rating) && agent.rating >= 0 && agent.rating <= 5), `${label}: agent ${agent.id} rating must be 0..5`);

    if (agent.api && agent.api.docUrl) {
      assert(agent.api.docUrl === "#" || /^https?:\/\//i.test(agent.api.docUrl), `${label}: agent ${agent.id} api.docUrl must be # or http(s)`);
    }

    if (Array.isArray(agent.images)) {
      for (const image of agent.images) {
        assert(typeof image === "string" && /^https?:\/\//i.test(image), `${label}: agent ${agent.id} image must be http(s)`);
      }
    }
  }

  if (data.meta && Number.isInteger(data.meta.total)) {
    assert(data.meta.total === data.agents.length, `${label}: meta.total ${data.meta.total} does not match agents length ${data.agents.length}`);
  }

  for (const category of data.categories) {
    assert(category.count === counts.get(category.id), `${label}: category ${category.id} count ${category.count} does not match agents ${counts.get(category.id)}`);
  }
}

validateDataset("agents.js", readAgentsJs());
validateDataset("agents.json", readJson("agents.json"));

if (failures.length) {
  console.error("Data validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Data validation passed.");
