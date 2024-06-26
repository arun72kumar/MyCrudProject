import Layout from "../layout/Layout";
import Categories from "../Categories";
import { useState } from "react";

function Home() {
  const [categories, setCategories] = useState(Categories);
  function handleFilter (c)
  {
        const filter_data = Categories.filter((cat)=>{
          return cat.category === c;
        })
        setCategories(filter_data)
  }
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-md-3">
            <div className="list-group">
              <button
                type="button"
                className="list-group-item list-group-item-action rounded-0"
                aria-current="true"
                onClick={()=>handleFilter("Men")}
              >
                Men
              </button>
              <button
                type="button"
                className="list-group-item list-group-item-action"
                onClick={()=>handleFilter("Women")}
              >
                Women
              </button>
              <button
                type="button"
                className="list-group-item list-group-item-action"
                onClick={()=>handleFilter("Shirts")}
              >
                Shirts
              </button>
              <button
                type="button"
                className="list-group-item list-group-item-action rounded-0"
                onClick={()=>setCategories(Categories)}
              >
                All
              </button>
            </div>
          </div>
          <div className="col-md-9">
            {/* {JSON.stringify(categories, null)} */}
            <div className="row d-flex">
            {categories.map((cat, i) => (
              <div key={i} className="col-md-4 mb-2">
              <div  className="card rounded-0" style={{ width: "18rem" }}>
                <img src={cat?.image} className="card-img-top mt-2" alt="..." 
                style={{objectFit:"contain"}} height={'200'} width={'200'}/>
                <div className="card-body">
                  <h5 className="card-title">{cat?.title.toUpperCase()}</h5>
                  <h6>Category {cat?.category}</h6>
                  <h6>Price {cat?.price}</h6>
                  <a href="#" className="btn btn-secondary rounded-0 me-1">
                    More details
                  </a>
                  <a href="#" className="btn btn-secondary rounded-0 ">
                    Add to cart
                  </a>
                </div>
              </div>
              </div>
            ))}
            </div>
           
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
