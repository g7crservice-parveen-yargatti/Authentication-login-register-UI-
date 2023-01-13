import React from 'react'
import './about.css'
function About() {
  return (
    <>
    <section id="about">
			
			<div className='content'>
				<h2> Information about Authentication and movies list project</h2>
				<div className="row info">
					<div className="col-sm-8">
						<p>
							     This project is mern stack development task project, in this project i have worked 
                            for user authentication and third party API for Movies and i have designed a buetifull signIn / signUp form ,
                            responsive navbar and searching movies .
                        </p>
						<span className="signature">-parveen yargatti</span>
					</div>

					
				</div>
				
				<div id="set">
					<h3>project developement Technologies</h3>
					<ul className="vertical-list">
						<li>
							<ul className="vertical-list skills " id="w">
								<li>HTML</li>
								<li>CSS</li>
								<li>Typescript</li>
							</ul>
						</li>
						<li>
							<ul className="vertical-list skills" id="auto">
								<li>React</li>
							</ul>
						</li>

						<li>
							<ul className="vertical-list skills" id="misc-skills">
								<li>Mern Stack</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
			
		</section>
 </>
  )
}

export default About