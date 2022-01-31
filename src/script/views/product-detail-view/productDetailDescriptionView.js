import { View } from "../view.js";
import { MINI_IMAGE_AMOUNT } from "../../config.js";

class ProductDetailDescriptionView extends View {
  _parentElement = document.querySelector(".product-description");
  _productDetailSection = document.querySelector(".section-product-detail");

  _generageSmallImages(productId, query) {
    let result = [];

    for (let i = 1; i <= MINI_IMAGE_AMOUNT; i++) {
      result.push(`
        <div class="small-image ${i === 1 ? "active" : ""}">
          <img
            src="../resources/images/products/${productId}/${query}-${i}.jpg"
            alt="Product image"
          />
        </div>
      `);
    }

    return result.join("\n");
  }

  _generateSpecification(specs) {
    return `
      <li>Kích thước: ${specs.size || ""}</li>
      <li>Nơi sản xuất: ${specs.madeIn || ""}</li>
      <li>Chất liệu: ${specs.material || ""}</li>
      <li>Kèm theo: ${specs.belongings || ""}</li>
    `;
  }

  _generateMarkup() {
    const data = this._data;
    const locationQuery = this._getLocationSearchValues();

    return `
    <div class="product-description__gallery">
      <div class="product-description__gallery__big-img">
        <img
          src="../resources/images/products/${data.id}/${locationQuery}-1.jpg"
          alt="Product image"
        />

        ${this._generateSliderButtons()}

      <div class="product-description__gallery__small-images-container">
        ${this._generageSmallImages(data.id, locationQuery)}
      </div>
    </div>

    <div class="product-order product-order--responsive">
      
    </div>

    <div class="product-description__text">
      <div class="product-description__text__title">Mô tả chi tiết</div>
      <ul class="product-description__text__specification-list">
        ${this._generateSpecification(data.specs)}
      </ul>

      <div class="product-description__text__title">
        Thông tin sản phẩm
      </div>
      <div class="product-description__text__content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Lectus elit dolor nibh quam. Urna sed mattis odio risus
          lobortis. Tristique consectetur tincidunt amet et. Non et
          aliquet nullam mus sed tristique amet est venenatis. In
          placerat odio hac egestas ac turpis adipiscing in. Aliquam
          enim purus duis porttitor vulputate sapien eleifend lectus.
          Ultricies felis molestie mattis lacus, etiam eget orci
          ultricies est. Dictumst massa duis nunc, erat accumsan nisl
          volutpat eu. Nunc lobortis id egestas condimentum et. Potenti
          et egestas consequat ultricies diam. Fames consectetur feugiat
          tortor consequat arcu...
        </p>
      </div>
    </div>
    `;
  }
}

export default new ProductDetailDescriptionView();
