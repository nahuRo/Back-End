# DEL ONE PROD FROM ONE CART

<!-- mutation{
  deleteProdFromOneCart(id_C:"6368f6ce47474025e2166792",id_P:"6368fb78499e6bed11353c60"){
    _id
    products {
      tittle
      price
      thumbnail
      description
      stock
      codeBar
      ARS
      CLP
    }
  }
} -->

# ADD PROD TO CART

<!-- mutation{
    addProdToCart(
        id:"6368f6ce47474025e2166792",
        tittle: "4",
        price: 10,
        thumbnail: "aa",
        description: "ss",
        stock: 1
    )
    {
        _id
        products {
            tittle
            price
            thumbnail
            description
            stock
            codeBar
            ARS
            CLP
        }
    }
} -->

# ADD CART

<!-- mutation{
  addCart{
    _id
  }
} -->

# LOGIN USER

<!-- mutation{
  loginUser(
    email:"test"
    password:"test"
  ){
    token
  }
} -->

# GET ONE USER

<!-- query{
  getOne_U(id:"635d802acd9fb8f9d79ae0a7"){
    _id
    name
    password
  }
} -->

# ADD USER

<!-- mutation{
  addUser(
    email:"test"
    password:"test"
    name:"test"
    address:"test"
    age:1
    phone:1
  ){
    _id
    email
    password
  }
} -->

# UPDATE ONE PRODUCT

<!-- mutation{
  updateProd(id:"63652eebbd92df63c84c0c1f",tittle:"aaaaaaaaaaaaa"){
    tittle
    _id
    price
  }
}	   -->

# ADD PRODUCT

<!-- mutation {
  addProd(tittle: "4", price: 10, thumbnail: "aa", description: "ss", stock: 1) {
    tittle
    price
    thumbnail
    stock
    description
  }
} -->

# DELETE ONE PRODUCT

<!-- mutation {
  deleteProd(id:"63652ee7bd92df63c84c0c1b") {
    tittle
    price
    thumbnail
    description
    stock
    codeBar
    ARS
    CLP
  }
} -->
