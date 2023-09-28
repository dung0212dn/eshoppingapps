const formattedNumber = (price) => {
      return new Intl.NumberFormat("vi-VN").format(price);
    };

export {formattedNumber}