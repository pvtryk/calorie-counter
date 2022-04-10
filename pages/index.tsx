import type { NextPage } from 'next'
import { gql, useQuery } from '@apollo/client';

const AllMealsQuery = gql`
  query {
    meals {
      id
      name
      description
      kcal
      ingredients
      image
      category
    }
  }
`;

const Home: NextPage = () => {
  const { data, error, loading } = useQuery(AllMealsQuery);


  if (loading) return <p>LOADING...</p>

  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <h1>Calorie counter</h1>

      <div className="container mx-auto max-w-5xl my-20 px-5">
        <div className="container">
          {data.meals.map(el => (
            <div key={el.id}>
              <p>Name: {el.name}</p>
              <p>Description: {el.description}</p>
              <p>kcal: {el.kcal}</p>
              <p>Category: {el.category}</p>
              <p>Ingredients:</p>
              <ul>
                {el.ingredients.map(ing => <li key={ing}>{ing}</li>)}
              </ul>
              <br/><br/><br/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
