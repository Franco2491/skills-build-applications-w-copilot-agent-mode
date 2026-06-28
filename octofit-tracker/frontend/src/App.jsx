import './App.css'

function App() {
  return (
    <main className="container py-5">
      <section className="row align-items-center g-4">
        <div className="col-lg-7">
          <p className="text-uppercase fw-semibold text-primary">OctoFit Tracker</p>
          <h1 className="display-4 fw-bold">Track workouts, lead teams, and stay consistent.</h1>
          <p className="lead text-muted">
            A modern multi-tier fitness platform for logging activities, building teams,
            and competing on a live leaderboard.
          </p>
          <div className="d-flex gap-3">
            <a className="btn btn-primary btn-lg" href="#">Get started</a>
            <a className="btn btn-outline-secondary btn-lg" href="#">Explore features</a>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0 p-4">
            <h2 className="h4 fw-bold">Platform highlights</h2>
            <ul className="list-group list-group-flush mt-3">
              <li className="list-group-item px-0">Personal workout suggestions</li>
              <li className="list-group-item px-0">Team and challenge management</li>
              <li className="list-group-item px-0">Real-time leaderboards and progress insights</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
