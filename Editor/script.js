const globalData = {
  creator: [],
  contributor: [],
  creditRole: [],
  videolink: [],
  downloadLink: [],
  extraSection: [],
};
const previewDiv = document.getElementById("previewCode");

const FilesKVP = new Map();

function addGenericCard(type, event) {
  if (event) event.preventDefault();
  const schema = genericData[type];
  const wrapper = document.getElementById(`${type}-list`);
  const index = globalData[type].length + 1;

  const card = document.createElement("div");
  card.className = schema.containerClass;
  const entry = { id: `${type}-${index}` };

  schema.children.forEach((child) => {
    const el = document.createElement(child.tag);

    if (child.tag === "div" && child.content) {
      el.className = child.class || "";
      el.textContent = child.content.replace("{{index}}", index);
    } else {
      if (child.type) el.type = child.type;
      if (child.placeholder) el.placeholder = child.placeholder;
      if (child.class) el.className = child.class;
      if (child.label) {
        const label = document.createElement("label");
        label.innerText = child.label;
        card.appendChild(label);
      }

      if (child.key) {
        el.setAttribute("data-key", child.key);
        entry[child.key] = el;

        // hideOnToggle handling
        if (child.showOnToggle) el.style.display = "none";
      }

      // checkbox toggle
      if (child.toggleTarget) {
        el.addEventListener("change", () => {
          const target = entry[child.toggleTarget];
          if (target) target.style.display = el.checked ? "block" : "none";
        });
      }
    }

    card.appendChild(el);
  });

  // Remove button
  const removeBtn = document.createElement("button");
  removeBtn.className = "remove-btn";
  removeBtn.innerText = "❌ Remove";
  removeBtn.onclick = () => {
    wrapper.removeChild(card);
    globalData[type] = globalData[type].filter((f) => f.id !== entry.id);
    updateLabels(type);
  };

  card.appendChild(removeBtn);
  wrapper.appendChild(card);
  globalData[type].push(entry);
}

function updateLabels(type) {
  const base = genericData[type].title;
  const cards = document.querySelectorAll(`#${type}-list .contributor-label`);
  cards.forEach((el, i) => {
    el.textContent = `${base} #${i + 1}`;
  });
}

function exportAllData() {
  const result = {};

  Object.keys(globalData).forEach((type) => {
    result[type] = globalData[type].map((entry) => {
      const obj = { id: entry.id };
      Object.entries(entry).forEach(([key, val]) => {
        if (key !== "id" && val?.value !== undefined) {
          obj[key] = val.type === "checkbox" ? val.checked : val.value;
        }
      });
      return obj;
    });
  });

  console.log(result);
  return result;
}
function toggleContributors() {
  const checked = document.getElementById("allow-contributors").checked;
  document.getElementById("contributor-wrapper").style.display = checked
    ? "block"
    : "none";
}

function openImageDialog(idElement) {
  var a = _("<input>").attr({
    type: "file",
    accept: "image/*",
    onchange: "OpenDialogInit(event," + idElement + ")",
  });

  a.click();
}

function OpenDialogInit(event, idElement) {
  var file = event.target.files[0];
  if (file) {
    var uniqueID = FilesKVP.size + "_yhg_load_init_" + file.name;
    FilesKVP.set(uniqueID, file);

    idElement.value = uniqueID;
  }

  event.target.remove();
}

function CopyTextArea(idElement) {
  const textarea = document.getElementById(idElement);
  if (textarea) {
    navigator.clipboard.writeText(textarea.value)
      .then(() => {
        alert("Code copied");
      })
      .catch(err => {
        alert("Failed to copy: " + err);
      });
  } else {
    alert("Textarea not found");
  }
}


//sm = social media
function getSafeSM(value) {
  var a = value.split("-");
  var type = a[0],
    index = a[1];
  var data = socialMedias[type][index - 1];
  if (data) {
    return data;
  } else {
    return "#";
  }
}

var html = "";
document.addEventListener("DOMContentLoaded", function () {
  var reset = document.getElementById("reset");
  var createhtml = document.getElementById("createHtml");
  var preview = document.getElementById("preview");
  var publishArchive = document.getElementById("publishArchive");
  var publish = document.getElementById("publish");

  reset.addEventListener("click", (e) => {
    resetF();
  });

  createhtml.addEventListener("click", function () {
    createHtml();
  });

  document.body.addEventListener("contextmenu", (e) => {
    // e.preventDefault();
  });

  var selection = document.querySelectorAll(".contectInfo select[id]");

  selection.forEach(function (el, i) {
    el.addEventListener("change", function () {
      var selectedIndex = el.selectedIndex;

      for (let j = i + 1; j < selection.length; j++) {
        if (selection[j].options.length > selectedIndex) {
          selection[j].selectedIndex = selectedIndex;
        }
      }
    });
  });
});

function resetF() {
  Object.keys(globalData).forEach(function (d, i) {
    _("#" + d + "-list").html("");
  });

  previewDiv.innerText = "";
}

async function createHtml() {
  const data = exportAllData();

  const postTitle =
    document.getElementById("postTitle").value || "Untitled Post";
  const thumbnailKey = document.getElementById("Thumbnail").value || "";
  const thumbnail = await getUploadedThumbnailURL(thumbnailKey);
  const version = document.getElementById("version").value || "";
  const password = document.getElementById("Password").value || "";
  const noteOp = document.getElementById("noteOp").value || "";

  const yt = getSafeSM(document.getElementById("contect-yt").value);
  const insta = getSafeSM(document.getElementById("contect-insta").value);
  const gmail = getSafeSM(document.getElementById("contect-gmail").value);
  const whatsappGroup = getSafeSM(
    document.getElementById("contect-whatsappGroup").value
  );

  html = `<body class="bussid-mod-body">\n`;

  html += `  <div class="mod-image">\n`;
  html += `    <img src="${thumbnail}" alt="${postTitle}" />\n`;
  html += `  </div>\n\n`;

  html += `  <div class="section-container mod-info-section">\n    <h3>Mod Details:</h3>\n`;

  if (data.creator?.length) {
    html += `    <p><strong>Created by:</strong>\n`;
    data.creator.forEach((c, i) => {
      const sep = i < data.creator.length - 1 ? ", " : "";
      html += `<a href="${c.link}" target="_blank">${c.name}</a>${sep}`;
    });
    html += `</p>\n`;
  }

  if (data.contributor?.length) {
    html += `    <p><strong>Collaboration with:</strong>\n`;
    data.contributor.forEach((c, i) => {
      const sep = i < data.contributor.length - 1 ? ", " : "";
      html += `<a href="${c.link}" target="_blank">${c.name}</a>${sep}`;
    });
    html += `</p>\n`;
  }

  html += `    <h3>Features:</h3>\n    <div class="mod-features">\n      <ul>\n`;
  const features = document.getElementById("Mod-d-features").value;
  features.split("\n").forEach((f) => {
    if (f.trim()) html += `        <li>${f}</li>\n`;
  });
  html += `      </ul>\n    </div>\n  </div>\n\n`;

  html += `  <div class="section-container contact-info-section">\n    <h3>Contact Info:</h3>\n`;
  html += `    <p><strong>Join our WhatsApp Group:</strong> <a href="${whatsappGroup}" target="_blank">Click here to join</a></p>\n`;
  html += `    <p><strong>Follow us on Instagram:</strong> <a href="${insta}" target="_blank">Click here to follow</a></p>\n`;
  html += `    <p><strong>Email:</strong> <a href="mailto:${gmail}">${gmail}</a></p>\n  </div>\n\n`;

  html += `  <div class="bussid-mod-section-container bussid-mod-demo-version">\n    <h3 class="bussid-mod-header">Credit</h3>\n`;
  data.creditRole.forEach((c) => {
    html += `    <div class="bussid-mod-credit-card">\n      <h4><span class="emoji">🎨</span> ${c.name}</h4>\n      <p class="bussid-mod-credit-role">${c.role}</p>\n      <ul class="bussid-mod-credit-details">\n`;
    c.details.split("\n").forEach((line) => {
      if (line.trim()) html += `        <li>${line}</li>\n`;
    });
    html += `      </ul>\n`;
    if (c.thanksToggle && c.thanksMsg) {
      html += `      <div class="bussid-mod-credit-thanks">\n        <div class="thanks-glow-card">\n`;
      html += `          <span class="thanks-icon">💎</span>\n          <span class="thanks-message">Big Thanks to <strong>${c.name}</strong>: ${c.thanksMsg}</span>\n`;
      html += `        </div>\n      </div>\n`;
    }
    html += `    </div>\n`;
  });
  html += `    <p class="bussid-mod-credit-thanks">A special thanks to our supportive public</p>\n  </div>\n\n`;

  html += `  <div class="mod-version-unique">Mod Version: <span>${version}</span></div>\n\n`;

  html += `  <div class="bussid-mod-download-button">\n`;
  data.videolink.forEach((v) => {
    const name = v.videoName || "Watch Video";
    html += `    <button class="bussid-mod-button"><a href="${v.link}" target="_blank">${name}</a></button>\n`;
  });
  data.downloadLink.forEach((dl) => {
    html += `    <button class="bussid-mod-button"><a href="${dl.link}" target="_blank">Download Mod</a></button>\n`;
  });
  html += `  </div>\n\n`;

  html += `  <div class="bussid-mod-section-container bussid-mod-instructions">\n    <h3 class="bussid-mod-header">Installation Instructions:</h3>\n`;
  html += `    <p>1. Extract the zip file to a folder.</p>\n    <p>2. Select the files you wish to add.</p>\n    <p>3. Copy or Cut the selected files.</p>\n    <p>4. Navigate to <strong>Android > obb > com.maleo.bussimulatorid > assets > bin > data</strong>.</p>\n`;
  html += `    <p>5. Paste the files into the designated folder.</p>\n`;
  html += `    <p><strong>Note:</strong> This mod works with version ${
    version || "v4.3.4 Only"
  }</p>\n`;
  if (password)
    html += `    <p><strong>Password:</strong> <span class="yhg-password-copy">${password}</span></p>\n`;
  if (noteOp) html += `    <p><strong>Note:</strong> ${noteOp}</p>\n`;
  html += `  </div>\n\n`;

  data.extraSection.forEach((sec) => {
    html += `<div class="bussid-mod-section-container">\n<h3 class="bussid-mod-header">${sec.name}</h3>\n`;
    sec.details.split("\n").forEach((line) => {
      if (line.trim()) html += `<p>${line}</p>\n`;
    });
    if (sec.includeHtmlToggle && sec.includedHtml) {
      html += `${sec.includedHtml}\n`;
    }
    html += `</div>\n\n`;
  });

  html += `  <div class="bussid-mod-section-container bussid-mod-copyright-mod">\n`;
  html += `    <h3 class="bussid-mod-header">Copyright Notice</h3>\n`;
  html += `    <p>&copy; 2025 Yellow Host Gaming. All rights reserved.</p>\n`;
  html += `    <p>Unauthorized editing, redistribution, or uploading of this mod without proper credit is strictly prohibited.</p>\n`;
  html += `    <p>For inquiries or collaborations, please contact us through the provided channels.</p>\n`;
  html += `    <p>Don't modify its files, strictly prohibited.</p>\n  </div>\n\n`;

  html += `  <div class="bussid-mod-footer-mod">\n    <p>Thank you for your support! 🌟</p>\n  </div>\n</body>`;
  previewDiv.innerText = html;
  previewDiv.style.display = "block";
}

async function getUploadedThumbnailURL(key) {
  const file = FilesKVP.get(key);
  if (!file) return null;

  // Check if it's a file from dialog (not a URL)
  if (!key.includes("_yhg_load_init_")) {
    return key; // already URL
  }

  // Upload to Firebase
  const fileName = `thumbnails/${Date.now()}_${file.name}`;
  const storageRef = storage.ref(fileName);

  try {
    const snapshot = await storageRef.put(file);
    const url = await snapshot.ref.getDownloadURL();
    return url;
  } catch (err) {
    console.error("Thumbnail upload failed:", err);
    return null;
  }
}

const CLIENT_ID =
  "642329332512-0qif0ia19d8ccgudfpjvd2u8snc3l3fn.apps.googleusercontent.com";
let accessToken = "";

function handleGoogleLogin() {
  google.accounts.oauth2
    .initTokenClient({
      client_id:
        "642329332512-0qif0ia19d8ccgudfpjvd2u8snc3l3fn.apps.googleusercontent.com",
      scope: "https://www.googleapis.com/auth/blogger",
      callback: (response) => {
        if (response.access_token) {
          accessToken = response.access_token;
          console.log("✅ Access Token:", accessToken);
          fetchBlogIdFromUrl();
        } else {
          alert("❌ Failed to get access token.");
        }
      },
    })
    .requestAccessToken();
}

function fetchBlogIdFromUrl() {
  const blogUrl = "https://yellowhostgaming01.blogspot.com/";

  fetch(
    `https://www.googleapis.com/blogger/v3/blogs/byurl?url=${encodeURIComponent(
      blogUrl
    )}`,
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      const blogId = data.id;
      console.log("🆔 Blog ID:", blogId);
      createPost(blogId);
    })
    .catch((err) => {
      console.error("❌ Blog ID fetch error:", err);
    });
}

function createPost(blogId) {
  const postData = {
    title: "Test Post from Generator",
    content: "<p>This post was created using Google Identity Services!</p>",
  };

  fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("📬 Post Created:", data);
      alert("✅ Post Created! URL: " + data.url);
    });
}
