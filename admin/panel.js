// Refresh Staff list when the page is refreshed
$(document).ready(function() {
  refreshStaffList();
});

var staffSelect1 = $("#vtv-overlay-staff1");
var staffSelect2 = $("#vtv-overlay-staff2");
var staffSelect3 = $("#vtv-overlay-staff3");

var staffListRadio1 = $('#vtv-overlay-staff1-prepick');
var staffListRadio2 = $('#vtv-overlay-staff2-prepick');
var staffListRadio3 = $('#vtv-overlay-staff3-prepick');

var staffCustom1 = $('#vtv-overlay-staff1-name');
var staffCustom2 = $('#vtv-overlay-staff2-name');
var staffCustom3 = $('#vtv-overlay-staff3-name');

var emptyStaffMember = {
  "name": "NONE",
  "avatar": ""
};

var guestAvatar = "/view/vtv-pregame/img/guest.jpg";

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

    staff.forEach(function (member, index) {
      // Create option element
      var option = document.createElement('option');
      option.value = index;
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

function updateStaff() {
    var left = {},
        right = {},
        camera = {};

    // Left caster icon
    if (staffListRadio1.is(':checked')) {
        var id = staffSelect1.find(':selected').val();
        left = {
            name: staff[id].name,
            avatar: staff[id].avatar
        };
    } else {
        left = {
            name: staffCustom1.val(),
            avatar: guestAvatar
        }
    }

    // Right caster icon
    if (staffListRadio2.is(':checked')) {
        var id = staffSelect2.find(':selected').val();
        right = {
            name: staff[id].name,
            avatar: staff[id].avatar
        };
    } else {
        right = {
            name: staffCustom2.val(),
            avatar: guestAvatar
        }
    }

    // Streamer icon
    if (staffListRadio3.is(':checked')) {
        var id = staffSelect3.find(':selected').val();
        camera = {
            name: staff[id].name,
            avatar: staff[id].avatar
        };
    } else {
        camera = {
            name: staffCustom3.val(),
            avatar: guestAvatar
        }
    }

    nodecg.sendMessage('staffUpdate', {
        leftCaster: left,
        rightCaster: right,
        camera: camera
    });
}

$("#vtv-overlay-updateActiveStaff").click(updateStaff);
$("#vtv-overlay-refreshStaffList").click(refreshStaffList);

$('#vtv-overlay-fadeIn').click(function() {
    nodecg.sendMessage('fadeIn');
});

$('#vtv-overlay-fadeOut').click(function() {
    nodecg.sendMessage('fadeOut');
});
