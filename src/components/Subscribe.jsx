import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BE_URL = import.meta.env.VITE_BE_URL;

function Subscribe() {
  const initialSubscriptionDetails = {
    email: "",
    categories: "general",
    frequency: "daily",
  }
  const [subscription, setSubscription] = useState(initialSubscriptionDetails);
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem('userEmail');

  useEffect(() => {
    if (loggedInUser) {
      setSubscription({
        ...subscription,
        email: loggedInUser,
      })
    }
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${BE_URL}/api/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ email, categories, frequency }),
      body: JSON.stringify(subscription),
    })
      .then((res) => {
        if (res.ok) {
          localStorage.setItem('isSubscribedUser', subscription.email);
          navigate("/");
        } else {
          console.error("Subscription failed");
          alert('Subscription failed')
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container mt-4">
      <h2 style={{ marginLeft: '28rem' }}>Subscribe</h2>
      <form onSubmit={handleSubmit} style={{ width: '50%', margin: '0 auto' }}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={subscription.email}
            onChange={(e) => 
              // setEmail(e.target.value)
              setSubscription({
                ...subscription,
                email: e.target.value
              })
            }
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="categories" className="form-label">
            News Categories
          </label>
          <select
            className="form-select"
            id="categories"
            value={subscription.categories}
            onChange={(e) =>
              // setCategories(e.target.value)
              setSubscription({
                ...subscription,
                categories: e.target.value,
              })
            }
          >
            <option value="general">General</option>
            <option value="business">Business</option>
            <option value="sports">Sports</option>
            <option value="technology">Technology</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="frequency" className="form-label">
            Frequency
          </label>
          <select
            className="form-select"
            id="frequency"
            value={subscription.frequency}
            onChange={(e) => 
              // setFrequency(e.target.value)
              setSubscription({
                ...subscription,
                frequency: e.target.value
              })
            }
          >
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success" style={{ float: 'right' }}>
          Subscribe
        </button>
      </form>
    </div>
  );
}

export default Subscribe;
