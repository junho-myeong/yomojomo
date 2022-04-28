function list() {

	// 1) URL에서 쿼리스트링(query string)을 추출한다.
	var arr = location.href.split("?");
	console.log(arr);

	if (arr.length == 1) {
		alert("요청 형식이 옳바르지 않습니다.")
		throw "URL 형식 오류!";
	}

	var qs = arr[1];
	console.log(qs);

	// 2) 쿼리 스트링에서 email 값을 추출한다.
	var params = new URLSearchParams(qs);
	var no = params.get("no");

	if (no == null) {
		alert("해당 번호의 연락처가 없습니다.");
		throw "파라미터 오류!";
	}
	console.log(no);

	// 3) 서버에서 데이터 가져오기
	var inbox = document.querySelector(".inbox")
	var divget = document.querySelector("#div-get");
	var htmlGenerator = Handlebars.compile(divget.innerHTML);

	fetch(`/notice/select?no=${no}`).then(function(response) {
		return response.json();
	}).then(function(lists) {
    
		inbox.innerHTML = htmlGenerator(lists);
		console.log(lists)
		console.log(lists.content)
	})
}

$(document).on('click', '.update-btn', function() {
	var xNo = document.querySelector(".update-btn").value;
	location.href = "/jaewon/admin/notice/view/uindex.html?no=" + xNo;
})

$(document).on('click', '.update-finish-btn', function() {
	if (confirm('수정하시겠습니까?')) {
		var fd = new FormData();
		var xNo = $('.update-finish-btn').val()
		var xTitle = $('input[name="title"]').val()
		var xContent = $('textarea[name="content"]').val()

		fd.append("no", xNo);
		fd.append("title", xTitle);
		fd.append("content", xContent);

		fetch("/notice/update", {
			method: "POST",
			body: new URLSearchParams(fd)
		})
			.then(function(response) {
				return response.json();
			})
			.then(function(result) {
				if (result.status == "success") {
					alert("업데이트 되었습니다.")
					location.href = "/jaewon/admin/notice/view/index.html?no=" + xNo;
				} else {
					window.alert("로그인 후 다시 시도해주세요!!");
				}
			});
	}
	return false;
})

$(document).on('click', '.delete-btn', function() {
	if (confirm('게시글을 삭제 하시겠습니까? 신중히 선택해주세요')) {
		var fd = new FormData();
		var xNo = $('.delete-btn').val()
		fd.append("no", xNo);

		fetch("/notice/delete", {
			method: "POST",
			body: new URLSearchParams(fd)
		})
			.then(function(response) {
				return response.json();
			})
			.then(function(result) {
				if (result.status == "success") {
					alert("게시글이 삭제 되었습니다.")
					location.href = "/jaewon/admin/notice/index.html?no=1&cutno=5&searchKeyword=";
				} else {
					window.alert("로그인 후 다시 시도해주세요");
				}
			});
	}
	return false;
})

$(document).on('click', '.cancel-btn', function() {
	location.href = "/jaewon/admin/notice/index.html?no=1&cutno=5&searchKeyword=";
})

$(document).on('click', '.cancel-finish-btn', function() {
	var xNo = document.querySelector(".cancel-finish-btn").value;
	location.href = "/jaewon/admin/notice/view/index.html?no=" + xNo;
})