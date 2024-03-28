async function fetchGithubRepos(orgName, token) {
  const url = `https://github.enterprise.com/api/v3/orgs/${orgName}/repos`;
  const headers = {
    "Accept": "application/vnd.github+json",
    "Authorization": `Bearer ${token}`
  };

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
      redirect: 'follow'
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(`Failed to fetch: ${errorData.message}`);
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

// Example usage:
const orgName = "xxxrepo";
const token = "<YOUR-GITHUB_TOKEN>";
fetchGithubRepos(orgName, token).then(data => console.log(data));

