var perfEntries = performance.getEntriesByType("navigation");

if (perfEntries[0].type === "back_forward") {
    location.reload();
}

function fillUpCourseBoxContainer(courses) {
    document.getElementById("courseBoxContainer").innerHTML = ""; 
    if(courses.length == 0) {
        document.getElementById("courseBoxContainer").innerHTML += 
        `            
        <div class="notFound">
            <div class="icon">
                <i class="fas fa-list-ul"></i>
            </div>
            <div class="text">
                <div class="title">No Course Found</div>
                <div class="semiTitle">Please Check Spelling</div>
            </div>
        </div>
        `;
    }
    else {
        courses.forEach(function(course) {
            document.getElementById("courseBoxContainer").innerHTML += 
            `
            <div class="courseBox" style="background-image: ${course.css}">
                <div class="text">
                    <div class="title">${course.title}</div>
                    <div class="semiTitle">${course.code}</div>
                </div>
                <div class="delete" onclick="deleteCourse('${course.id}')">
                    <i class="fas fa-trash-alt"></i>
                </div>
            </div>
            `;
        });
    }
}
bookmarkedCourseData = localStorage.getItem("bookmarkedCourse");
bookmarkedCourse = [];

if(bookmarkedCourseData != '') {
    bookmarkedCourseData = bookmarkedCourseData.split(",");
    bookmarkedCourseData.forEach(function(code) {
        matchedCourse = Courses.filter(function(el) {
            return el.id.includes(code);
        });
        bookmarkedCourse.push(matchedCourse[0]);
    });
}

fillUpCourseBoxContainer(bookmarkedCourse);

function deleteCourse(courseId) {
    bookmarkedCourse = bookmarkedCourse.filter(function(el) {
        if (el.id != courseId) {
            return true;
        }
    });
    var newBookmarkedCourseData = "";
    bookmarkedCourse.forEach(function(newId,i) {
        if(i!=0) {
            newBookmarkedCourseData += ",";
        }
        newBookmarkedCourseData += newId.id;
    })
    localStorage.setItem("bookmarkedCourse", newBookmarkedCourseData);
    fillUpCourseBoxContainer(bookmarkedCourse);
    localStorage.setItem("courseChanged", "true");
}

document.getElementById("back").onclick = function() {
    if (window.history.length >= 2) {
        window.history.back();
    }
    else { 
        window.location.href = 'index.html';
    }
}

$("html").on("pointerdown", ".rippleButton, .rippleButtonBlack", function(evt) {
    var btn = $(evt.currentTarget);
    var x = evt.pageX - btn.offset().left;
    var y = evt.pageY - btn.offset().top;

    $("<span class='ripple'/>").appendTo(btn).css({
        left: x,
        top: y
    });
});
$("html").on("pointerup", ".rippleButton, .rippleButtonBlack", function(evt) {
    setTimeout(function() {
        $('.ripple').remove();
    }, 500);
});
