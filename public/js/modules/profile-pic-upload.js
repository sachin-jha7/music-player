// Image Upload

export const userCantUpload = function () {
    if (window.innerWidth <= 768) {
        document.querySelector("#image-input-label-mobile").addEventListener("click", () => {
            document.querySelector("#image-input-label-mobile").innerHTML = `&#10006; Unauthorized`;
            document.querySelector("#image-input-label-mobile").style.background = "#ff6b6b";
            document.querySelector(".notification").style.display = "flex";
            document.querySelector(".notification p").innerText = "You're not logged in";
            const imgUploadField = document.querySelector("#image-input-mobile");
            imgUploadField.disabled = true;
        });
    }

    const imgUploadFieldDesk = document.querySelector("#image-input-desktop");
    document.querySelector("#image-input-label-desktop").addEventListener("click", () => {
        document.querySelector("#image-input-label-desktop").innerHTML = `&#10006; Unauthorized`;
        document.querySelector("#image-input-label-desktop").style.background = "#ff6b6b";
        document.querySelector(".notification").style.display = "flex";
        document.querySelector(".notification p").innerText = "You're not logged in";
        imgUploadFieldDesk.disabled = true;
    });
}


let cropper;



export const uploadImage = function (event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    let previewImg = null;
    if (window.innerWidth <= 768) {
        const previewImgMobile = document.querySelector("#preview-mobile");
        document.querySelector(".image-editor-box-mobile").style.display = "block";
        previewImgMobile.src = url;
        previewImg = previewImgMobile;
    } else {
        document.querySelector(".image-editor-box-desktop").style.display = "block";
        document.querySelector(".user-img-desktop").style.display = "none";
        const previewImgDesk = document.querySelector("#preview-desktop");
        previewImgDesk.src = url;
        previewImg = previewImgDesk;
    }
    if (cropper) cropper.destroy();

    cropper = new Cropper(previewImg, {
        aspectRatio: 1,
        viewMode: 1,
        autoCropArea: 1,
        responsive: true,
        background: false,
    });

}




export const uploadFinalImage = function () {
    this.innerHTML = `Saving <i class="fa-solid fa-circle-notch fa-spin"></i>`
    this.disabled = true;

    const canvas = cropper.getCroppedCanvas({
        width: 300,
        height: 300,
        imageSmoothingQuality: "high"
    });

    canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append("image", blob);

        const res = await fetch("/api/tunes/upload", {
            method: "POST",
            body: formData
        });
        const data = await res.json();
        // console.log(data);
        document.querySelector(".user-img-desktop img").src = data.imageUrl;
        document.querySelector(".user-container-desktop").style.display = "none";
        this.innerHTML = `Save`;
        this.disabled = false;
        if (window.innerWidth <= 768) {
            document.querySelector(".user-img-mobile img").src = data.imageUrl;
            document.querySelector(".image-editor-box-mobile").style.display = "none";
            this.innerHTML = `Save`;
            this.disabled = false;
        }
    });
}