// Refresh Staff list when the page is refreshed
$(document).ready(function() {
  refreshStaffList();
});

var staffSelect1 = $("#vtv-overlay-staff1");
var staffSelect2 = $("#vtv-overlay-staff2");
var staffSelect3 = $("#vtv-overlay-staff3");

var emptyStaffMember = {
  "name": "NONE",
  "avatar": ""
};

var staff = [];

function refreshStaffList() {
  // Get all staff from sleepy.mongoose rest interface
  $.ajax({
    url: "http://vps.mattmcn.com:27080/i52/staff/_find"
  }).done(function (data) {
    staff = data.results;

    // Sort by name
    staff.sort(function (a, b) {
      if (a.name > b.name)
        return 1;
      if (a.name < b.name)
        return -1;
      return 0;
    });

    // Add 'NONE' option to top
    staff.unshift(emptyStaffMember);

    // Clear old staff list
    staffSelect1.empty();
    staffSelect2.empty();
    staffSelect3.empty();

    staff.forEach(function (member) {
      // Create option element
      var option = document.createElement('option');
      option.value = member.name;
      option.innerHTML = member.name;

      // jQueryify it
      option = $(option);

      // Append it
      staffSelect1.append(option.clone());
      staffSelect2.append(option.clone());
      staffSelect3.append(option.clone());
    });
  });
}