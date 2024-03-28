async function deleteMultipleGithubRepos(repoArray, token) {
  try {
    // Use Promise.all to wait for all deletion operations to complete
    const results = await Promise.all(
      repoArray.map(repo => deleteGithubRepo( repo, token))
    );
    console.log("All repos deleted:", results);
  } catch (error) {
    console.error("An error occurred while deleting multiple repos:", error);
  }
}

async function deleteGithubRepo(  repo, token) {
  const url = `https://github.enterprise.com/api/v3/repos/${repo}`;
  const headers = {
    "Accept": "application/vnd.github+json",
    "Authorization": `Bearer ${token}`
  };

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: headers,
      redirect: 'follow'
    });

    if (response.ok) {
      return `Repository ${repo} deleted successfully`;
    } else {
      const errorData = await response.json();
      throw new Error(`Failed to delete ${repo}: ${errorData.message}`);
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

// Example usage:
const repoArray = ["WOF-CodeRefactoring/code4fun_java"]

//const repoArray = repos.slice(0,1)
const token = "<YOUR_GITHUB_TOKEN>";

deleteMultipleGithubRepos( repoArray, token);




